<#
.SYNOPSIS
    Lists every .NET user secret that belongs to the projects in this solution.

.DESCRIPTION
    "User secrets" are settings (connection strings, keys, passwords) that .NET keeps for you OUTSIDE the
    repository, in a plain-text JSON file under  %APPDATA%\Microsoft\UserSecrets\<id>\secrets.json
    A project opts in by having a <UserSecretsId> line in its .csproj. This script:
      1. finds every .csproj under the OI folder and reads its UserSecretsId,
      2. opens the matching secrets.json for each one and lists the keys,
      3. lists any secret stores on this machine that no project here uses (leftovers, for example from the
         old ProductManager folder).
    It only READS. It never changes or deletes anything.

    By default the VALUES are hidden and only the key names are shown, so nothing sensitive lands on your
    screen, in a screenshot or in a copied console. Add -ShowValues to see them.

.PARAMETER Root
    The folder to search for projects: the folder that contains OI.slnx.
    Default: the folder this script is saved in, so save it in the OI folder and just run it.

.PARAMETER ShowValues
    Print the secret values too. Do not paste that output into a chat, an email or a ticket.

.EXAMPLE
    .\Get-UserSecrets.ps1
    Lists the keys of every user secret, values hidden.

.EXAMPLE
    .\Get-UserSecrets.ps1 -ShowValues
    Lists the keys and the values.

.EXAMPLE
    .\Get-UserSecrets.ps1 -Root "D:\Src\Wbarge_GitHub\OI\OI"
    Searches a specific folder instead of the folder the script is in.
#>

# CmdletBinding makes this a full "advanced" script, so the standard switches such as -Verbose work.
[CmdletBinding()]
param(
    # The folder to search. $PSScriptRoot is the folder this .ps1 file is saved in.
    [string]$Root = $PSScriptRoot,

    # A switch is $true when you type it on the command line and $false when you leave it out.
    [switch]$ShowValues
)

# Stop at the first real error instead of carrying on and printing a misleading answer.
$ErrorActionPreference = 'Stop'

# If the script was pasted into a console, $PSScriptRoot is empty, so fall back to the current folder.
if ([string]::IsNullOrWhiteSpace($Root)) { $Root = (Get-Location).Path }

# Turn the folder into a full path and make sure it exists, so a typo is reported right away.
$Root = (Resolve-Path -LiteralPath $Root).Path

# This is where .NET keeps user secrets on Windows: one sub-folder per UserSecretsId.
$storeRoot = Join-Path $env:APPDATA 'Microsoft\UserSecrets'

# ---------------------------------------------------------------------------------------------------------
# Helper 1: flatten the nested JSON of a secrets file into a plain list of Key/Value pairs.
# Nested levels are joined with a colon, the same way ASP.NET Core names settings (for example Jwt:Issuer)
# and the same way "dotnet user-secrets list" prints them.
# ---------------------------------------------------------------------------------------------------------
function Get-FlatSecret {
    # $Node is the JSON object (or part of one) to read; $Prefix is the key built up so far.
    param($Node, [string]$Prefix)

    # A JSON object exposes its named children as properties: visit each one.
    foreach ($property in $Node.PSObject.Properties) {

        # Build this entry's full key. The braces in ${Prefix} stop PowerShell reading "Prefix:" as a drive name.
        if ($Prefix) { $key = "${Prefix}:$($property.Name)" } else { $key = $property.Name }

        # Remember the value so the checks below read clearly.
        $value = $property.Value

        if ($value -is [System.Management.Automation.PSCustomObject]) {
            # The value is itself a JSON object: go one level deeper with the key built so far.
            Get-FlatSecret -Node $value -Prefix $key
        }
        elseif ($value -is [System.Array]) {
            # The value is a JSON list: each item gets its position number as the last part of its key (Cors:Origins:0).
            for ($i = 0; $i -lt $value.Count; $i++) {
                $item = $value[$i]
                $itemKey = "${key}:$i"
                if ($item -is [System.Management.Automation.PSCustomObject]) {
                    # A list item that is an object: go deeper.
                    Get-FlatSecret -Node $item -Prefix $itemKey
                }
                else {
                    # A plain list item: emit it as a Key/Value pair.
                    [pscustomobject]@{ Key = $itemKey; Value = [string]$item }
                }
            }
        }
        else {
            # A plain value (text, number, true/false): emit it as a Key/Value pair. A null becomes empty text.
            [pscustomobject]@{ Key = $key; Value = [string]$value }
        }
    }
}

# ---------------------------------------------------------------------------------------------------------
# Helper 2: read one secret store (one folder) and return its secrets as a sorted list of Key/Value pairs.
# ---------------------------------------------------------------------------------------------------------
function Read-SecretStore {
    # $Folder is the store's folder, for example %APPDATA%\Microsoft\UserSecrets\57a3f113-...
    param([string]$Folder)

    # Each store keeps everything in one file called secrets.json.
    $file = Join-Path $Folder 'secrets.json'

    # No folder or no file means nothing has ever been set for this id: return an empty list.
    if (-not (Test-Path -LiteralPath $file)) { return @() }

    # Read the whole file as one piece of text.
    $text = Get-Content -LiteralPath $file -Raw

    # A file that exists but is empty also means "no secrets".
    if ([string]::IsNullOrWhiteSpace($text)) { return @() }

    try {
        # Turn the JSON text into objects, flatten them, and sort by key so the output is easy to scan.
        $json = $text | ConvertFrom-Json
        return @(Get-FlatSecret -Node $json -Prefix '' | Sort-Object Key)
    }
    catch {
        # A damaged file should not stop the whole report: say so and carry on with the next store.
        Write-Host "    (could not read $file : $($_.Exception.Message))" -ForegroundColor Red
        return @()
    }
}

# ---------------------------------------------------------------------------------------------------------
# Helper 3: print a list of secrets, hiding the values unless -ShowValues was given.
# ---------------------------------------------------------------------------------------------------------
function Write-Secret {
    # $Secrets is the Key/Value list returned by Read-SecretStore.
    param($Secrets)

    # Print one line per secret.
    foreach ($secret in $Secrets) {
        if ($ShowValues) {
            # Show the value, but squeeze line breaks (a PEM key has many) into a visible \n so it stays on one line.
            $shown = $secret.Value -replace "`r?`n", '\n'
        }
        else {
            # Hide the value; the length is enough to tell "filled in" from "empty" without revealing anything.
            $shown = '(hidden, {0} characters)' -f $secret.Value.Length
        }
        # Indent the line under its project and print it as  key = value.
        Write-Host ('    {0} = {1}' -f $secret.Key, $shown)
    }
}

# ---------------------------------------------------------------------------------------------------------
# Main part of the script
# ---------------------------------------------------------------------------------------------------------

# Say what is being searched, so the output makes sense when it is read later.
Write-Host ''
Write-Host "User secrets for the projects under: $Root" -ForegroundColor Cyan
Write-Host "Secret stores live in:               $storeRoot" -ForegroundColor Cyan

# Remind the reader that values are on screen when -ShowValues was used.
if ($ShowValues) {
    Write-Host 'VALUES ARE SHOWN. Do not paste this output into a chat, an email or a ticket.' -ForegroundColor Yellow
}

# Find every project file up to two folders down (OI\<project>\<project>.csproj), skipping build and package folders.
$projects = Get-ChildItem -LiteralPath $Root -Filter '*.csproj' -Recurse -Depth 2 -File |
    Where-Object { $_.FullName -notmatch '\\(node_modules|bin|obj)\\' } |
    Sort-Object Name

# Collects the id of every project that has one, so the leftovers check below knows which stores are "taken".
$knownIds = @()

# Counters for the summary line at the end.
$projectsWithId = 0
$totalSecrets = 0

# Look at each project in turn.
foreach ($project in $projects) {

    # Ask the .csproj (it is XML) for its <UserSecretsId> element; take the first one if there are several.
    $idNode = Select-Xml -Path $project.FullName -XPath '//UserSecretsId' | Select-Object -First 1

    # No UserSecretsId means this project does not use user secrets at all: skip it silently.
    if (-not $idNode) { continue }

    # The id is the text inside the element, for example 57a3f113-8216-4062-941f-ad1ac0d85166.
    $id = $idNode.Node.InnerText.Trim()

    # Remember it and count the project.
    $knownIds += $id
    $projectsWithId++

    # Work out where this project's secrets are kept and read them.
    $folder = Join-Path $storeRoot $id
    $secrets = Read-SecretStore -Folder $folder
    $totalSecrets += @($secrets).Count

    # Print a heading for the project, then its secrets (or a note that there are none).
    Write-Host ''
    Write-Host $project.BaseName -ForegroundColor Green
    Write-Host "    id:    $id"
    Write-Host "    file:  $(Join-Path $folder 'secrets.json')"
    if (@($secrets).Count -eq 0) {
        Write-Host '    (no secrets set)' -ForegroundColor DarkGray
    }
    else {
        Write-Secret -Secrets $secrets
    }
}

# Leftovers: secret stores on this machine that none of the projects above points at.
Write-Host ''
if (Test-Path -LiteralPath $storeRoot) {
    # Every sub-folder of the store root whose name is not an id used by a project here.
    $orphans = Get-ChildItem -LiteralPath $storeRoot -Directory | Where-Object { $_.Name -notin $knownIds }

    if (@($orphans).Count -gt 0) {
        Write-Host 'Secret stores on this machine that no project under this folder uses:' -ForegroundColor Yellow
        foreach ($orphan in $orphans) {
            # Print the store's id and its secrets just like a project's.
            $secrets = Read-SecretStore -Folder $orphan.FullName
            $totalSecrets += @($secrets).Count
            Write-Host ''
            Write-Host "    id:    $($orphan.Name)"
            Write-Host "    file:  $(Join-Path $orphan.FullName 'secrets.json')"
            if (@($secrets).Count -eq 0) {
                Write-Host '    (no secrets set)' -ForegroundColor DarkGray
            }
            else {
                Write-Secret -Secrets $secrets
            }
        }
    }
    else {
        Write-Host 'No leftover secret stores: every store on this machine belongs to a project here.' -ForegroundColor DarkGray
    }
}
else {
    # The folder only exists once someone has set a secret, so its absence means none were ever set.
    Write-Host "No secrets folder exists yet ($storeRoot): no user secrets have ever been set on this machine." -ForegroundColor DarkGray
}

# One-line summary of what was found.
Write-Host ''
Write-Host ("{0} project(s) use user secrets; {1} secret(s) listed in total." -f $projectsWithId, $totalSecrets) -ForegroundColor Cyan
Write-Host ''
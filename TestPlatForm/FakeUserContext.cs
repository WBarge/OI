using System.Reflection.Metadata.Ecma335;
using OI.Glue.Security;

namespace TestPlatForm;

public class FakeUserContext :IClientContext
{
    public bool IsAuthenticated { get => true; }
    public string UserId
    {
        get => "c38aa14d-c343-4004-9074-6a8202daf567";
    }
    public string DisplayName { get=>"Administrator"; }
    public string? Email { get=>"wbarge@cox.net"; }
    public IReadOnlyCollection<string> Roles { get=>[]; }
    public IReadOnlyCollection<string> Groups { get=>[]; }
}
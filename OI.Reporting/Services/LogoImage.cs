namespace OI.Reporting.Services;

/// <summary>
/// Recognises the logo image types the login page may show (PNG, JPG and GIF) from the file's own first bytes, not from
/// the name it was uploaded under, so a mislabelled or unexpected file (an SVG, say, which can carry script) is never
/// served as an image.
/// </summary>
public static class LogoImage
{
    /// <summary>The content type for a PNG, JPEG or GIF file; null for anything else (including an empty file).</summary>
    public static string? ContentTypeOf(byte[]? bytes)
    {
        if (bytes is null)
        {
            return null;
        }

        if (bytes.Length >= 8
            && bytes[0] == 0x89 && bytes[1] == 0x50 && bytes[2] == 0x4E && bytes[3] == 0x47
            && bytes[4] == 0x0D && bytes[5] == 0x0A && bytes[6] == 0x1A && bytes[7] == 0x0A)
        {
            return "image/png";
        }

        if (bytes.Length >= 3 && bytes[0] == 0xFF && bytes[1] == 0xD8 && bytes[2] == 0xFF)
        {
            return "image/jpeg";
        }

        // "GIF87a" or "GIF89a"
        if (bytes.Length >= 6
            && bytes[0] == 0x47 && bytes[1] == 0x49 && bytes[2] == 0x46 && bytes[3] == 0x38
            && (bytes[4] == 0x37 || bytes[4] == 0x39) && bytes[5] == 0x61)
        {
            return "image/gif";
        }

        return null;
    }
}

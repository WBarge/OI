namespace OI.Glue.Services;

/// <summary>Password hashing. Implemented by the OI.Auth application so Business needs no crypto package.</summary>
public interface IPasswordService
{
    string Hash(string password);
    bool Verify(string passwordHash, string password);
}

namespace OI.Glue.Models;

public sealed record AuthTokens(string AccessToken, DateTimeOffset AccessTokenExpires, string RefreshToken);

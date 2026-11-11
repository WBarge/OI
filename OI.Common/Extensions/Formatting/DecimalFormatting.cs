namespace OI.Common.Extensions.Formatting;

/// <summary>
/// Provides extension methods for formatting decimal values.
/// </summary>
public static class DecimalFormatting
{
    /// <summary>
    /// Converts the specified decimal value to its currency string representation
    /// using the "en-US" culture format.
    /// </summary>
    /// <param name="value">The decimal value to format as currency.</param>
    /// <returns>A string that represents the currency format of the specified decimal value.</returns>
    public static string ToCurrency(this decimal value)
    {
        return value.ToString("C", new System.Globalization.CultureInfo("en-US"));
    }
}
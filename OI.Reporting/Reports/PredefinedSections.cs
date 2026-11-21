using OI.Glue.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports;

internal static class PredefinedSections
{
    extension(IContainer parentContainer)
    {
        internal void CreatePublicLetterHead(string reportName, ICompanyProfile? companyProfile)
        {
            parentContainer.AlignCenter()
                .ExtendHorizontal()
                .Layers(layers =>
                {
                    layers.Layer().Image(companyProfile!.LogoFile);
                    layers.Layer().Background(Color.FromHex("#F2FFFFFF")); //white at about 85% opacity.
                    layers.PrimaryLayer().Padding(20).Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            row.RelativeItem(4).PaddingTop(0).ScaleToFit().Text(text =>
                            {
                                text.Line(companyProfile!.CompanyName).FontColor(Colors.Blue.Darken4)
                                    .FontSize(18).Bold();
                                text.Line(companyProfile!.CompanyAddress).FontColor(Colors.Blue.Darken4)
                                    .FontSize(14);
                                text .Line(companyProfile!.CompanyCity + ", " + companyProfile!.CompanyState + " " +
                                          companyProfile!.CompanyZip)
                                    .FontColor(Colors.Blue.Darken4).FontSize(14);
                                text.Line($"Phone: {companyProfile!.CompanyPhone}")
                                    .FontColor(Colors.Blue.Darken4).FontSize(14);
                            });
                            row.RelativeItem(4).Text(reportName).FontColor(Colors.Blue.Darken4).FontSize(30)
                                .AlignRight();
                        });
                    });

                });
        }

        internal void CreateInternalLetterHead(string reportName, ICompanyProfile? companyProfile)
        {
            parentContainer.AlignCenter()
                .ExtendHorizontal()
                .Layers(layers =>
                {
                    layers.Layer().AlignCenter().Image(companyProfile!.LogoFile).FitArea();
                    layers.Layer().Background(Color.FromHex("#D8FFFFFF")); 
                    layers.PrimaryLayer()
                        .Padding(20)
                        .AlignCenter()
                        .Text(reportName)
                        .FontColor(Colors.Blue.Darken4)
                        .Bold()
                        .FontSize(30);
                });
        }
    }
}
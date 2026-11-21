using OI.Common.Extensions.Comparison;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace OI.Reporting.Reports.CustomerReports;

public static class AddressCell
{
    public static void AddAddress(this IContainer parentContainer,string address1,string address2,string city,string state,string zip,int fontSize)
    {
        parentContainer.Column(addCol =>
        {
            addCol.Item().Row(addRow =>
            {
                addRow.RelativeItem(3).Table(tableDescriptor =>
                {
                    tableDescriptor.ColumnsDefinition(columns => { columns.RelativeColumn(); });

                    //BILL TO
                    tableDescriptor.Cell().Text(address1).FontSize(fontSize);
                    if (address2!.IsNotEmpty())
                    {
                        tableDescriptor.Cell().Text(address2).FontSize(fontSize);
                    }
                    tableDescriptor.Cell().Text(city+ ", " + state).FontSize(fontSize);
                    tableDescriptor.Cell().Text(zip).FontSize(fontSize);
                });
            });
        });
    }
}
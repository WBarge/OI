OI.Common
=========

Common utility functions, extensions, models and exceptions shared across the application.

Who uses it
-----------
- The OI projects (OI.Data, OI.Business, OI.Service, OI.Auth, OI.Reporting, OI.Hub, OI.Integration).
- The ProductManager projects (ProductManager.Glue, ProductManager.Business, ProductManager.Data.EF and
  ProductManager.Service). 

Guidelines
----------
- Keep it free of references to Entity Framework and to any OI.* or ProductManager.* project. Today it only
  uses JetBrains.Annotations, Microsoft.AspNetCore.Http.Abstractions and Newtonsoft.Json.
- Keep everything generic. Nothing in here should know about orders, products, customers or users.
- Add a test in OI.Common.Tests for anything you add.

What is in it
-------------
OI.Common.Exceptions
    RequestException            a domain-specific error, encoded so one central handler at the top of the
                                application can deal with it
    RequiredObjectException     thrown by Required() when a value is missing

OI.Common.Models
    DateRange                   a start/end date range (with DateTime.MinValue / MaxValue defaults)

OI.Common.Extensions.Comparison          (asking a question about a value)
    IsEmpty / IsNotEmpty        object (null), string, Guid, DateTime and collections
    IsNumeric, IsValidEmail, IsNotValidEmail
    In                          is the string one of the strings in a list
    Required                    throws RequiredObjectException when the object, Guid or string is empty

OI.Common.Extensions.Transformations     (turning a value into another value)
    Truncate, ToByteArray, ToEnum, ToDateTime, ToInt, ToIntString, ToSpacedString, GetValues, FromArrayToString

OI.Common.Extensions.Formatting          (DecimalFormatting: ToCurrency)
OI.Common.Constants                      (Terms: shared constant text)

Using it
--------
1. Add a project reference:


2. Add the using for the group you need. Sample:

       using OI.Common.Extensions.Comparison;
       using OI.Common.Extensions.Transformations;

       if (name.IsEmpty()) { ... }
       string shortName = name.Truncate(50);

The two Extensions namespaces are separate on purpose, and no method name appears in both, so
importing both never makes an instance-style call ambiguous.
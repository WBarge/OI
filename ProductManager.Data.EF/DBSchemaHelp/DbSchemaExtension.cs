// ***********************************************************************
// Author           : Bill Barge
// Created          : 07-12-2024
//
// Last Modified By : Bill Barge
// Last Modified On : 07-12-2024
// ***********************************************************************
// <copyright file="DbSchemaExtension.cs" company="N/A">
//     Copyright (c) N/A. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using OI.Common.Extensions.Comparison;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ProductManager.Data.EF.DBSchemaHelp;

/// <summary>
/// Class DBSchemaExtension.
/// </summary>
public static class DbSchemaExtension
{
    /// <summary>
    /// Handles the database schema creation and migrations.
    /// </summary>
    /// <param name="services">The services.</param>
    public static void HandleDbSchema(this IServiceCollection services)
    {
        ServiceProvider provider = services.BuildServiceProvider();
        ProductDbContext dbContext = provider.GetRequiredService<ProductDbContext>();
        dbContext.Required(nameof(dbContext));
        dbContext.Database.Migrate();

    }
}
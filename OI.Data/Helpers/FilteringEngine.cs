
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.CompilerServices;
using CrossCutting.Extensions;
using Microsoft.EntityFrameworkCore;
using OI.Glue.Models;

[assembly:InternalsVisibleTo("OI.Data.Tests")]

namespace OI.Data.Helpers;

/// <summary>
/// Class FilteringEngine.
/// </summary>
internal static class FilteringEngine
{
    public const string AND_LOGICAL_OPERATOR = "and";
    public const string OR_LOGICAL_OPERATOR = "or";
    public const string EQUALS_COMPARISON = "equals";
    public const string NOT_EQUALS_COMPARISON = "notEquals";
    public const string STARTS_WITH_COMPARISON = "startsWith";
    public const string CONTAINS_COMPARISON = "contains";
    public const string NOT_CONTAINS_COMPARISON = "notContains";
    public const string ENDS_WITH_COMPARISON = "endsWith";


    /// <summary>
    /// Builds the filter query asynchronous.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="dbSet">The database set.</param>
    /// <param name="filterCriteria">The filter criteria.</param>
    /// <param name="cancellationToken">The cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
    /// <returns>Task&lt;IQueryable&lt;T&gt;&gt;.</returns>
    public static Task<IQueryable<T>> BuildFilterQueryAsync<T>(this DbSet<T> dbSet,
        Dictionary<string, IFilterMetaData[]> filterCriteria = null!, 
        CancellationToken cancellationToken = default) where T : class
    {
        IQueryable<T> finalQuery = dbSet.AsQueryable();
        Task task = Task.Run( () =>
        {
            IQueryable<T> query = dbSet.AsQueryable();


            filterCriteria ??= new Dictionary<string, IFilterMetaData[]>();
            LambdaExpression filterExpression = BuildLambdaExpression<T>(filterCriteria);


            MethodInfo whereMethodRef = typeof(Queryable).GetMethods()
                .First(m => m.Name == "Where" && m.IsGenericMethodDefinition && m.GetParameters().Length == 2);

            MethodInfo whereMethod = whereMethodRef.MakeGenericMethod(typeof(T));

            MethodCallExpression whereCallExpression = Expression.Call(
                whereMethod,
                query.Expression,
                filterExpression);

            finalQuery = query.Provider.CreateQuery<T>(whereCallExpression);
            return Task.CompletedTask;
        }, cancellationToken);
        Task.WaitAll(task);
        return Task.FromResult(finalQuery);
    }
   
    /// <summary>
    /// Builds the lambda expression used in a where clause on a collection like a List&lt;T&gt;>.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="filters">The filters.</param>
    /// <returns>Func&lt;T, System.Boolean&gt;.</returns>
    public static Func<T, bool> BuildLambdaExpressionForCollections<T>(Dictionary<string, IFilterMetaData[]> filters)
    {
        LambdaExpression filterExpression = BuildLambdaExpression<T>(filters);
        return (Func<T, bool>)filterExpression.Compile();
    }

    /// <summary>
    /// Builds the lambda expression used in a where clause.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="filters">The filters.</param>
    /// <returns>Func&lt;T, System.Boolean&gt;.</returns>
    private static LambdaExpression BuildLambdaExpression<T>(Dictionary<string, IFilterMetaData[]> filters)
    {
        Type dataType = typeof(T);
        ParameterExpression pe = Expression.Parameter(dataType, dataType.Name[..1]);
        Expression e1 = BuildExpressions(pe, filters);

        Type func = typeof(Func<T,bool>);
        if (e1.IsEmpty())
        {
            e1 = Expression.Constant(true);
        }
        LambdaExpression predicate = Expression.Lambda(func, e1, pe);
        return predicate;
    }

    /// <summary>
    /// Builds the expressions.
    /// </summary>
    /// <param name="pe">The pe.</param>
    /// <param name="filters">The filters.</param>
    /// <returns>Expression.</returns>
    private static Expression BuildExpressions(ParameterExpression pe, Dictionary<string, IFilterMetaData[]> filters)
    {
        Expression returnValue = null!;
        Expression propertyExpression = null!;
        foreach (string propertyName in filters.Keys)
        {
            IFilterMetaData[] propertyFilters = filters[propertyName];
            for (int filterSub =0;filterSub<propertyFilters.Length;filterSub++ )
            {
                IFilterMetaData propertyFilter = propertyFilters[filterSub];
                if ((propertyFilter.LogicalOperator ?? string.Empty).IsEmpty() || (propertyFilter.MatchMode ?? string.Empty).IsEmpty() ||
                    (propertyFilter.SearchValue ?? string.Empty).IsEmpty())
                {
                    continue;
                }
                Expression nodeExpression = BuildPropertyExpression(pe, propertyName, propertyFilter.MatchMode!, propertyFilter.SearchValue!);
                if (filterSub > 0 && propertyFilters.Length > 1)
                {
                    // ReSharper disable once ConvertSwitchStatementToSwitchExpression
                    switch (propertyFilter.LogicalOperator)
                    {
                        case AND_LOGICAL_OPERATOR:
                            propertyExpression = Expression.And(nodeExpression, propertyExpression);
                            break;
                        case OR_LOGICAL_OPERATOR:
                            propertyExpression = Expression.Or(nodeExpression, propertyExpression);
                            break;
                    }
                }
                else
                {
                    propertyExpression = nodeExpression;
                }
            }

            if (returnValue != null)
            {
                returnValue = Expression.And(propertyExpression, returnValue);
            }
            else
            {
                returnValue = propertyExpression;
            }
        }

        return returnValue;
    }

    /// <summary>
    /// Builds the property expression.
    /// </summary>
    /// <param name="pe">The pe.</param>
    /// <param name="incomingProperty">The incoming property.</param>
    /// <param name="comparisonOperation">The comparison operation.</param>
    /// <param name="compareValue">The compare value.</param>
    /// <returns>Expression.</returns>
    private static Expression BuildPropertyExpression(Expression pe, string incomingProperty, string comparisonOperation, object compareValue)
    {
#pragma warning disable IDE0059
        Expression returnValue = null!;

        returnValue = BuildValueExpression(pe, incomingProperty, comparisonOperation, compareValue);

        return returnValue;
    }

    /// <summary>
    /// Builds the value expression.
    /// </summary>
    /// <param name="workingExpression">The working expression.</param>
    /// <param name="propertyName">Name of the property.</param>
    /// <param name="comparisonOperation">The comparison operation.</param>
    /// <param name="compareValue">The compare value.</param>
    /// <returns>Expression.</returns>
    private static Expression BuildValueExpression(Expression workingExpression, string propertyName, string comparisonOperation, object compareValue)
    {
        workingExpression = Expression.Property(workingExpression, propertyName);
        Expression valueExpression = BuildValueExpression(compareValue, ref workingExpression);
        Expression returnValue = BuildComparisonExpression(comparisonOperation, workingExpression, valueExpression);
        return returnValue;
    }

    /// <summary>
    /// Builds the value expression.
    /// </summary>
    /// <param name="compareValue">The compare value.</param>
    /// <param name="workingExpression">The working expression.</param>
    /// <returns>Expression.</returns>
    private static Expression BuildValueExpression(object compareValue, ref Expression workingExpression)
    {
        Expression valueExpression;
        if (workingExpression.Type == typeof(decimal))
        {
            valueExpression = Expression.Constant(decimal.Parse(compareValue.ToString() ?? throw new InvalidOperationException())); // this will be the value
        }
        else if (workingExpression.Type == typeof(DateTime))
        {
            valueExpression = Expression.Constant(DateTime.Parse(compareValue.ToString() ?? throw new InvalidOperationException())); // this will be the value
        }
        else if (workingExpression.Type == typeof(int))
        {
            valueExpression = Expression.Constant(int.Parse(compareValue.ToString() ?? throw new InvalidOperationException())); // this will be the value
        }
        else if (workingExpression.Type == typeof(string))
        {
            valueExpression = Expression.Constant(compareValue.ToString(), typeof(string));//Expression.Constant(0); // this will be the value
        }
        else if (workingExpression.Type == typeof(bool))
        {
            if (bool.TryParse((string?)compareValue, out bool value) == false)
            {
                value = false;
            }

            valueExpression = Expression.Constant(value);
        }
        else
        {
            valueExpression = Expression.Constant(compareValue); // this will be the value
        }

        return valueExpression;
    }

    /// <summary>
    /// Builds the comparison expression.
    /// </summary>
    /// <param name="comparisonOperation">The comparison operation.</param>
    /// <param name="workingExpression">The working expression.</param>
    /// <param name="valueExpression">The value expression.</param>
    /// <returns>Expression.</returns>
    /// <exception cref="Exception">Malformed comparison</exception>
    /// <exception cref="ArgumentOutOfRangeException">comparisonOperation - null</exception>
    private static Expression BuildComparisonExpression(string comparisonOperation, Expression workingExpression, Expression valueExpression)
    {
        Expression returnValue;
        Expression left;
        MethodInfo method;
        switch (comparisonOperation.Trim())
        {
            case "":
                throw new Exception("Malformed comparison");
            case EQUALS_COMPARISON:
                returnValue = Expression.Equal(workingExpression, valueExpression);
                break;
            case NOT_EQUALS_COMPARISON:
                returnValue = Expression.NotEqual(workingExpression, valueExpression);
                break;
            case STARTS_WITH_COMPARISON:
                if (valueExpression.Type == typeof(string))
                {
                    left = workingExpression;
                    method = typeof(string).GetMethods().First(m => m.Name == "StartsWith");
                    workingExpression = Expression.Call(left,
                        method,
                        valueExpression);
                    returnValue = workingExpression;
                }
                else
                {
                    returnValue = Expression.Constant(true);
                }
                break;
            case CONTAINS_COMPARISON:
                if (valueExpression.Type == typeof(string))
                {
                    left = workingExpression;
                    method = typeof(string).GetMethods().First(m => m.Name == "Contains");
                    workingExpression = Expression.Call(left,
                        method,
                        valueExpression);
                    returnValue = workingExpression;
                }
                else
                {
                    returnValue = Expression.Constant(true);
                }
                break;
            case NOT_CONTAINS_COMPARISON:
                if (valueExpression.Type == typeof(string))
                {
                    left = workingExpression;
                    method = typeof(string).GetMethods().First(m => m.Name == "Contains");
                    workingExpression = Expression.Call(left,
                        method,
                        valueExpression);
                    returnValue = Expression.Not(workingExpression);
                }
                else
                {
                    returnValue = Expression.Constant(true);
                }
                break;
            case ENDS_WITH_COMPARISON:
                if (valueExpression.Type == typeof(string))
                {
                    left = workingExpression;
                    method = typeof(string).GetMethods().First(m => m.Name == "EndsWith");
                    workingExpression = Expression.Call(left,
                        method,
                        valueExpression);
                    returnValue = workingExpression;
                }
                else
                {
                    returnValue = Expression.Constant(true);
                }
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(comparisonOperation), comparisonOperation, null);
        }

        return returnValue;
    }
}
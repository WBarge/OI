
declare @MaxNumberOfToppings int
set @MaxNumberOfToppings = 3;

with Tuple as
(
	select
		ProductOption.ProductId,
		cast(name as nvarchar(max)) as topList,
		1 as NumberOfToppings
	from
		ProductOption

	union all

	select
		n.ProductId,
		cast (concat (T.topList,',', n.name) as nvarchar(max)) as topList,
		NumberOfToppings +1
	from
		Tuple t
	inner join ProductOption n on (n.ProductId = t.productId) 
	 WHERE
		topList not like '%'+n.Name+'%' and 
		NumberOfToppings < @MaxNumberOfToppings
),
toppings as
(
	select Distinct(topList)as ListOfToppings,NumberOfToppings,t.ProductId as id
	from
		Tuple t
)

select
	p.Name as Pizza,pc.CharacteristicValue as Crust,t.listOfToppings, t.NumberOfToppings
from
	toppings t
	inner join Product p on (p.Id = t.id)
	inner join ProductCharacteristic pc on (pc.ProductId = p.Id)
order by
	Pizza,Crust,NumberOfToppings,listOfToppings

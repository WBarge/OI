create table #ids (id uniqueidentifier);
Declare @PizId as uniqueidentifier;
Declare @ToppingName as nvarchar(128);

insert into Product (Name,ShortDescription,Sku,Description,Price)
output inserted.Id into #ids
values('14 Pizza','A 14" Pizza','P1445','A 14" Pizza',12.99);
select @PizId=id from #ids;
delete #ids;

insert into ProductCharacteristic(ProductId,Name,CharacteristicValue)
values(@PizId,'Crust','Hand-Tossed');

insert into ProductCharacteristic(ProductId,Name,CharacteristicValue)
values(@PizId,'Crust','Thin');

insert into ProductCharacteristic(ProductId,Name,CharacteristicValue)
values(@PizId,'Crust','Pan');

set @ToppingName ='Anchovies';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Beef';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Bacon';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Canadian Bacon';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Chicken';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Italian Sausage';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Sausage';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Pepperoni';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Meetball';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Salami';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Green Pepper';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Mushroom';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Onion';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Tomatoes';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Banana Pepper';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Pineapple';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Black Olive';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Green Olive';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Jalapeno Pepper';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

set @ToppingName ='Spinach';
insert into ProductOption (ProductId,Name,ShortDescription,Description,Price)
values (@PizId,@ToppingName,@ToppingName,@ToppingName,1.25);

drop table #ids;

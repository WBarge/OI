
select p.Name,p.Sku,p.ShortDescription,pc.CharacteristicValue,po.Name from Product p 
left outer join ProductCharacteristic pc on (p.id = pc.ProductId)
left outer join ProductOption po on (p.Id = po.ProductId)
order by p.Name , pc.CharacteristicValue, po.Name
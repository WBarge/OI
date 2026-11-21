import { Characteristic } from "./characteristic";
import { ProductCharacteristic } from "./product-characteristic";
import { ProductSell } from "./product-sell";
import { ProductOption } from "./ProductOption";

export class Product {
    idValue!: string;
    name!: string;
    shortDescription!: string;
    sku!: string;
    price!: number;
    cost!:number;
    estimated!:number;
    description!: string;
    options!: ProductOption[];
    characteristics!:ProductCharacteristic[];
    sells!:ProductSell[];
}

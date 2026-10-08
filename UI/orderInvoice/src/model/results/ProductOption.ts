export class ProductOption {
    id!: string; //<- only used to the backend, not used in the UI
    idValue!: string;
    name!: string;
    price!: number;
    productId!: string;
    optionId!: string;
}

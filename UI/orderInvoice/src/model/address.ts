export class Address {
    public idValue!:string;
    public address1!: string;
    public address2!: string;
    public city!: string;
    public stateCode!: string;
    public zipCode!: string;

    constructor() {
        this.idValue = "";
        this.address1 = "";
        this.address2 = "";
        this.city = "";
        this.stateCode = "";
        this.zipCode = "";
    }
}

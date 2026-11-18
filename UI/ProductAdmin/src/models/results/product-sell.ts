
export class ProductSell {
    id!: string; //<- only used to the backend, not used in the UI
    idValue!: string;
    productId!: string;
    start!:Date;
    end!: Date;
    price!:number;
    rangeDates:Date[]| undefined;

    setStartAndEndFromRange(){
      if (!this.rangeDates || this.rangeDates.length < 2) {
        return;
      }
      this.start = this.rangeDates[0];
      this.end = this.rangeDates[1]
    }
}

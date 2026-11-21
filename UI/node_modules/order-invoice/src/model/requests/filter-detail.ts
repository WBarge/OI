
export type FilterDictionary = Map<string,FilterDetail[]>;

export class FilterDetail {
  public searchValue!: string;
  public matchMode!: string;
  public logicalOperator!: string;
}

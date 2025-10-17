export enum ProductStatus {
  SoldOut = 'SOLD OUT',
  InStock = '販売中',
}

export interface Store {
  name: string;
  status: {
    [productName: string]: ProductStatus;
  };
}

export interface InventoryData {
  products: string[];
  stores: Store[];
  lastUpdated: string;
}

export type OrderRequest = {
  id: number;
  dateOfOrder: Date;
  dateOfRealization: string;
  client: {id: number};
  items: {id: number}[];
  orderInvoiceFileURI: string; 
}
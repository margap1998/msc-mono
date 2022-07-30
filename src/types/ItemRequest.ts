import { ItemCategoryRequest } from '.';

export type ItemRequest = {
  name?: string;
  category?: ItemCategoryRequest;
  priceNetto?: number;
  VAT?: number;
  excise?: number | null;
  overhead?: number;
  available?: boolean;
}
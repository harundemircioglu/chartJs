import { Category } from "./category.model";
export class Product {
  id: number = 0;
  product_name: string = "";
  product_image: string = "";
  product_price: number = 0;
  category_id: number = 0;
  category = new Category;
}

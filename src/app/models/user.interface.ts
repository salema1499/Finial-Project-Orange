import Product from './product.interface';

export default interface User {
  _id: string;
  username: string;
  email: string;
  products: Product[];
  createsAt: Date;
}

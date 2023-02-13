export default interface Product {
  _id?: string;
  title: string;
  address: string;
  country: string;
  state?: string;
  type: string;
  coverImg: string;
  price: number;
  status?: string;
}

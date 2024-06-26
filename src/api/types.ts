interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: number;
  images: string[];
}

interface Category {
  _id: string;
  name: string;
}

interface RegisterResponseBody {
  _id: string;
  name: string;
  email: string;
  message?: string | null;
}

interface LoginResponseBody {
  token: string;
  message?: string | null;
}

type CarouselResponseBody = Product[];

export {
  Product,
  Category,
  LoginResponseBody,
  RegisterResponseBody,
  CarouselResponseBody,
};

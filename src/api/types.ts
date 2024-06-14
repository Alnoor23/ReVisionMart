interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: number;
  images: string[];
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
  LoginResponseBody,
  RegisterResponseBody,
  CarouselResponseBody,
};

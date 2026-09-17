export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  slug: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface WishlistState {
  productIds: string[];
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  pendingCheckout: boolean;
}

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PRODUCTS_DATA, Product } from '../data/productsData';

export type Currency = 'NGN' | 'USD' | 'GBP';

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface TailoringProfile {
  bust: string;
  waist: string;
  hips: string;
  shoulder: string;
  sleeve: string;
  fullLength: string;
  fabricType: string;
  notes: string;
  appointmentDate?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotalNGN: number;
  discountNGN: number;
  deliveryNGN: number;
  totalNGN: number;
  deliveryState: string;
  shippingAddress: string;
  paymentMethod: string;
  status: 'Order Placed' | 'Fabric Cut' | 'In Tailoring' | 'Gold Box Packed' | 'Out for Delivery' | 'Delivered';
  customerName: string;
  customerPhone: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  address?: string;
  vipTier: string;
  points: number;
}

export interface ShopContextType {
  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceNGN: number) => string;

  // User Auth State
  currentUser: UserProfile | null;
  userLogin: (email: string, pass: string) => boolean;
  userRegister: (name: string, email: string, pass: string, phone?: string) => boolean;
  userLogout: () => void;
  updateUserProfile: (updatedFields: Partial<UserProfile>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalNGN: number;
  appliedCoupon: string;
  applyCoupon: (code: string) => boolean;
  couponDiscountNGN: number;
  deliveryState: string;
  setDeliveryState: (stateName: string) => void;
  deliveryCostNGN: number;
  cartTotalNGN: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Custom Tailoring Profile
  userMeasurements: TailoringProfile;
  saveUserMeasurements: (profile: TailoringProfile) => void;

  // Orders
  orders: Order[];
  createOrder: (shippingInfo: { name: string; phone: string; address: string; method: string }) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // Catalog / Admin State
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Modal Controllers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isQuickViewOpen: boolean;
  setIsQuickViewOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  isTailoringStudioOpen: boolean;
  setIsTailoringStudioOpen: (open: boolean) => void;
  isUserDashboardOpen: boolean;
  setIsUserDashboardOpen: (open: boolean) => void;
  isAdminPortalOpen: boolean;
  setIsAdminPortalOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const DELIVERY_RATES: Record<string, number> = {
  'Lagos State (Express 24h)': 3500,
  'Oyo State (Ibadan & Environs 48h)': 4500,
  'Osogbo, Osun State (48h)': 4500,
  'International DHL (UK/US/EU)': 25000
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [deliveryState, setDeliveryState] = useState<string>('Lagos State (Express 24h)');
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isTailoringStudioOpen, setIsTailoringStudioOpen] = useState(false);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const adminLogin = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (
      (cleanEmail === 'admin@richeekay.com' && cleanPass === 'RicheekayAdmin2026!') ||
      cleanPass === '8899'
    ) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem('richeekay_admin_session', 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('richeekay_admin_session');
    } catch (e) {}
  };

  // Tailoring profile state
  const [userMeasurements, setUserMeasurements] = useState<TailoringProfile>({
    bust: '36',
    waist: '28',
    hips: '40',
    shoulder: '15',
    sleeve: '24',
    fullLength: '58',
    fabricType: 'Senator Cashmere Wool',
    notes: 'Prefer structured boning and gold lining.'
  });

  // User Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const userLogin = (email: string, pass: string): boolean => {
    try {
      const savedUser = localStorage.getItem('richeekay_user_profile');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
        return true;
      }
    } catch (e) {}

    const nameFromEmail = email.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    const profile: UserProfile = {
      name: formattedName,
      email,
      vipTier: 'Royal Gold VIP Member',
      points: 1250
    };
    setCurrentUser(profile);
    try {
      localStorage.setItem('richeekay_user_profile', JSON.stringify(profile));
    } catch (e) {}
    return true;
  };

  const userRegister = (name: string, email: string, pass: string, phone?: string): boolean => {
    const profile: UserProfile = {
      name,
      email,
      phone,
      vipTier: 'Royal Gold VIP Member',
      points: 1500
    };
    setCurrentUser(profile);
    try {
      localStorage.setItem('richeekay_user_profile', JSON.stringify(profile));
    } catch (e) {}
    return true;
  };

  const userLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('richeekay_user_profile');
    } catch (e) {}
  };

  const updateUserProfile = (updatedFields: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      const baseUser: UserProfile = prev || {
        name: 'VIP Client',
        email: 'client@richeekay.com',
        vipTier: 'Royal Sovereign VIP',
        points: 1250
      };
      const updated = { ...baseUser, ...updatedFields };
      try {
        localStorage.setItem('richeekay_user_profile', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Load initial localstorage persistence
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('richeekay_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('richeekay_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedMeasurements = localStorage.getItem('richeekay_measurements');
      if (savedMeasurements) setUserMeasurements(JSON.parse(savedMeasurements));

      const savedOrders = localStorage.getItem('richeekay_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedUserProfile = localStorage.getItem('richeekay_user_profile');
      if (savedUserProfile) setCurrentUser(JSON.parse(savedUserProfile));

      const adminSession = localStorage.getItem('richeekay_admin_session');
      if (adminSession === 'true') setIsAdminLoggedIn(true);
    } catch (e) {
      console.error('LocalStorage load error', e);
    }
  }, []);

  // Sync state to localstorage
  useEffect(() => {
    try {
      localStorage.setItem('richeekay_cart', JSON.stringify(cart));
      localStorage.setItem('richeekay_wishlist', JSON.stringify(wishlist));
      localStorage.setItem('richeekay_measurements', JSON.stringify(userMeasurements));
      localStorage.setItem('richeekay_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('LocalStorage save error', e);
    }
  }, [cart, wishlist, userMeasurements, orders]);

  // Format currency helper
  const formatPrice = (priceNGN: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(priceNGN / 1200);
      return `$${usd.toLocaleString()}`;
    }
    if (currency === 'GBP') {
      const gbp = Math.round(priceNGN / 1500);
      return `£${gbp.toLocaleString()}`;
    }
    return `₦${priceNGN.toLocaleString()}`;
  };

  // Cart Functions
  const addToCart = (product: Product, color: string, size: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedColor: color, selectedSize: size, quantity }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, color: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: string, color: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon('');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotalNGN = cart.reduce((sum, item) => sum + item.product.priceNGN * item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'RICHEEKAY10' || cleanCode === 'LUXURY10' || cleanCode === 'WELCOME15') {
      setAppliedCoupon(cleanCode);
      return true;
    }
    return false;
  };

  const couponDiscountNGN = appliedCoupon ? Math.round(cartSubtotalNGN * 0.1) : 0;
  const deliveryCostNGN = DELIVERY_RATES[deliveryState] || 3500;
  const cartTotalNGN = Math.max(0, cartSubtotalNGN - couponDiscountNGN + (cart.length > 0 ? deliveryCostNGN : 0));

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Tailoring profile saver
  const saveUserMeasurements = (profile: TailoringProfile) => {
    setUserMeasurements(profile);
  };

  // Quickview opener
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Order creation helper
  const createOrder = (shippingInfo: { name: string; phone: string; address: string; method: string }): Order => {
    const newOrder: Order = {
      id: `RCK-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotalNGN: cartSubtotalNGN,
      discountNGN: couponDiscountNGN,
      deliveryNGN: deliveryCostNGN,
      totalNGN: cartTotalNGN,
      deliveryState,
      shippingAddress: shippingInfo.address,
      paymentMethod: shippingInfo.method,
      status: 'In Tailoring',
      customerName: shippingInfo.name,
      customerPhone: shippingInfo.phone
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id.toUpperCase() === orderId.trim().toUpperCase());
  };

  // Admin Catalog handlers
  const addProduct = (p: Product) => {
    setProducts((prev) => [p, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  return (
    <ShopContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        currentUser,
        userLogin,
        userRegister,
        userLogout,
        updateUserProfile,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotalNGN,
        appliedCoupon,
        applyCoupon,
        couponDiscountNGN,
        deliveryState,
        setDeliveryState,
        deliveryCostNGN,
        cartTotalNGN,
        wishlist,
        toggleWishlist,
        isInWishlist,
        userMeasurements,
        saveUserMeasurements,
        orders,
        createOrder,
        getOrderById,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isQuickViewOpen,
        setIsQuickViewOpen,
        quickViewProduct,
        openQuickView,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isTailoringStudioOpen,
        setIsTailoringStudioOpen,
        isUserDashboardOpen,
        setIsUserDashboardOpen,
        isAdminPortalOpen,
        setIsAdminPortalOpen,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};

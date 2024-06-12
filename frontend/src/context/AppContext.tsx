import { ComponentType, ReactNode, createContext, useContext, useState } from 'react';

import { Product, ProductField } from '@/api/interactions';

interface AppContextProps {
  productFields: ProductField[];
  products: Product[];
  activeProduct: Product | null;
  setProductFields: (productFields: ProductField[]) => void;
  setProducts: (products: Product[]) => void;
  setActiveProduct: (product: Product) => void;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = () => useContext(AppContext) as AppContextProps;

export const AppContextProvider: ComponentType<{ children: ReactNode }> = ({ children }) => {
  const [productFields, setProductFields] = useState<AppContextProps['productFields']>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <AppContext.Provider
      value={{
        productFields,
        products,
        activeProduct,
        setProductFields,
        setProducts,
        setActiveProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

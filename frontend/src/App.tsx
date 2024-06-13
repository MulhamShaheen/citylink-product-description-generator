import { ThemeProvider } from '@gravity-ui/uikit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from '@/shared/ui';

import {
  FillProductDescriptionPage,
  SearchProductPage,
  FoundProductsPage,
  SimilarProductsPage,
  ProductCardPage,
  FillProductCardDetails,
  AddProductPage,
} from '@/pages';
import { AppContextProvider } from '@/context/AppContext';

import './App.css';

const routes = [
  {
    path: '/',
    element: <SearchProductPage />,
  },
  {
    path: '/search-product',
    element: <SearchProductPage />,
  },
  {
    path: '/fill-product-info',
    element: <FillProductDescriptionPage product={null} />,
  },
  {
    path: '/found-products',
    element: <FoundProductsPage />,
  },
  {
    path: '/similar-products',
    element: <SimilarProductsPage />,
  },
  {
    path: '/fill-product-card-details',
    element: <FillProductCardDetails />,
  },
  {
    path: '/show-product-card',
    element: <ProductCardPage />,
  },
  {
    path: '/add-product',
    element: <AddProductPage />,
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AppContextProvider>
            <Header />
            <Routes>
              {routes.map((route) => (
                <Route path={route.path} element={route.element} key={route.path} />
              ))}
            </Routes>
          </AppContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

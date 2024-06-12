import { ThemeProvider } from '@gravity-ui/uikit';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  FillProductDescriptionPage,
  UploadProductInfoPage,
  FoundProductsPage,
  SimilarProductsPage,
  ProductCardPage,
  FillProductCardDetails,
} from './pages';
import { AppContextProvider } from './context/AppContext';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',

    element: <UploadProductInfoPage />,
  },
  {
    path: '/upload-product-info',
    element: <UploadProductInfoPage />,
  },
  {
    path: '/fill-product-info',
    element: <FillProductDescriptionPage />,
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
]);

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
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

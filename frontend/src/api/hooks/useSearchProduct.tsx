import { useMutation } from 'react-query';

import { SearchProductRequest, SearchProductResponse } from '../interactions';
import { API_URL } from '../const';
import { useAppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

export const useSearchProduct = () => {
  const { setProducts } = useAppContext();
  const nav = useNavigate();

  return useMutation(async (data: SearchProductRequest) => {
    const res = (await fetch(
      API_URL +
        `/search-product?category=${data.category}&criteria=${data.criteria}&value=${data.value}`,
    ).then((r) => r.json())) as SearchProductResponse;

    if (!res.ok) {
      return;
    }

    setProducts(res.result);
    nav('/found-products');
  });
};

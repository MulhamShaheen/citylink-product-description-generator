import { useMutation } from 'react-query';

import { SearchProductRequest, SearchProductResponse } from '../interactions';
import { API_URL } from '../const';

export const useSearchProduct = () => {
  return useMutation(async (data: SearchProductRequest): Promise<SearchProductResponse> => {
    const res = (await fetch(
      API_URL +
        `/search-product?category=${data.category}&criteria=${data.criteria}&value=${data.value}`,
    ).then((r) => r.json())) as SearchProductResponse;

    return res;
  });
};

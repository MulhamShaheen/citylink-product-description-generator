import { useMutation } from 'react-query';

import { AddProductRequest, AddProductResponse } from '../interactions';
import { API_URL } from '../const';
import { useAppContext } from '@/context/AppContext';

export const useAddProduct = () => {
  const { setActiveProduct } = useAppContext();

  return useMutation(async (data: AddProductRequest) => {
    const res = (await fetch(API_URL + `/add-product`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((r) => r.json())) as AddProductResponse;

    if (!res.ok) {
      return;
    }

    setActiveProduct(res.result);
  });
};

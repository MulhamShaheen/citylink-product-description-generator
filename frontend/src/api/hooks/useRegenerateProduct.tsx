import { useMutation } from 'react-query';

import {
  RegenerateProductDescriptionRequest,
  RegenerateProductDescriptionResponse,
} from '../interactions';
import { API_URL } from '../const';
import { useAppContext } from '@/context/AppContext';

export const useRegenerateProduct = () => {
  const { setActiveProduct } = useAppContext();

  return useMutation(async (data: RegenerateProductDescriptionRequest) => {
    const res = (await fetch(API_URL + `/regenerate-product`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((r) => r.json())) as RegenerateProductDescriptionResponse;

    if (!res.ok) {
      return;
    }

    setActiveProduct(res.result);
  });
};

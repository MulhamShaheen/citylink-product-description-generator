import { useMutation } from 'react-query';

import { FillProductInfoRequest, FillProductInfoResponse } from '../interactions';
import { API_URL } from '../const';

export const useSendProductFields = () => {
  return useMutation(async (data: FillProductInfoRequest): Promise<FillProductInfoResponse> => {
    const res = (await fetch(API_URL + '/fill-product-details', {
      body: JSON.stringify(data),
      method: 'POST',
    }).then((r) => r.json())) as FillProductInfoResponse;

    return res;
  });
};

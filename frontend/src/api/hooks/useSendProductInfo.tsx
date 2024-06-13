import { useMutation } from 'react-query';

import { UploadProductInfoRequest, UploadProductInfoResponse } from '../interactions';
import { API_URL } from '../const';

export const useSendProductInfo = () => {
  return useMutation(async (data: UploadProductInfoRequest): Promise<UploadProductInfoResponse> => {
    const body = new FormData();
    body.append('product_name', data.productName);
    body.append('file', data.file);

    const res = (await fetch(API_URL + '/upload-product-info', {
      body,
      method: 'POST',
    }).then((r) => r.json())) as UploadProductInfoResponse;

    return res;
  });
};

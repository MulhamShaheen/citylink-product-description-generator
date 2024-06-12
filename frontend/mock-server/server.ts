import { delay, http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

export const routes = [
  http.post('upload-product-info', async () => {
    await delay();
    return HttpResponse.json({
      status: true,
      result: [
        {
          name: 'Название',
          value: 'Macbook Air',
        },
      ],
    });
  }),
  http.post('fill-product-details', async () => {
    await delay();
    return HttpResponse.json({
      status: true,
      result: {
        found: true,
        products: [
          { title: 'Macbook Air', description: 'Apple MGN63/MGN93/MGND3' },
          { title: 'Macbook Pro', description: 'Apple MGN63/MGN93/MGND3' },
          { title: 'Xiaomi Mini', description: 'Apple MGN63/MGN93/MGND3' },
        ],
      },
    });
  }),
];

export const serviceWorker = setupWorker(...routes);

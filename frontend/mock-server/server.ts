import { delay, http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

export const routes = [
  http.get('search-product', async (req) => {
    await delay();

    const criteria = new URL(req.request.url).searchParams.get('criteria');

    return HttpResponse.json({
      ok: true,
      result: [
        {
          id: 123,
          description: `
Lean. Mean. M3 machine.
MacBook Air sails through work and play — and the M3 chip brings even greater capabilities to the world’s most popular laptop. With up to 18 hours of battery life,1 you can take the superportable MacBook Air anywhere and blaze through whatever you’re into.
New MacBook Air with M3 from $1099 or $91.58/mo. for 12 mo.**
MacBook Air with M2 from $999 or $83.25/mo. for 12 mo.**`,
          title: 'Macbook Air',
        },
        {
          id: 124,
          description: 'Apple MGN63/MGN93/MGND3',
          title: 'Macbook Pro',
        },
        {
          id: 125,
          description: 'Apple MGN63/MGN93/MGND3',
          title: 'Macbook Max',
        },
      ],
    });
  }),
  http.post('regenerate-product', async () => {
    await delay(3000);

    return HttpResponse.json({
      ok: true,
      result: {
        id: 123,
        description: `GENERATED 
Lean. Mean. M3 machine.
MacBook Air sails through work and play — and the M3 chip brings even greater capabilities to the world’s most popular laptop. With up to 18 hours of battery life,1 you can take the superportable MacBook Air anywhere and blaze through whatever you’re into.
New MacBook Air with M3 from $1099 or $91.58/mo. for 12 mo.**
MacBook Air with M2 from $999 or $83.25/mo. for 12 mo.**`,
        title: 'Macbook Air',
      },
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import { configure } from '@gravity-ui/uikit';

import App from './App.tsx';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './index.css';
import { USE_MOCK } from './env.ts';

configure({
  lang: 'ru',
});

async function enableMocking() {
  if (!USE_MOCK) {
    return;
  }

  const { serviceWorker } = await import('../mock-server/server.ts');

  return serviceWorker.start();
}

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  ),
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { Providers } from './providers/index.tsx';
import { Routes } from './routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </StrictMode>,
);

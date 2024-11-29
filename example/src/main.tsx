import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { App } from './App.tsx'
import { Home } from './pages/Home.tsx'
import { queryClient, wagmiConfig } from './config.ts'
import { AuthProvider } from './context/AuthContext.tsx'
import './styles/global.scss'

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </WagmiProvider>,
)

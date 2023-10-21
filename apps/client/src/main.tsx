import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import { trpc } from './utils/trpc.ts'

const queryClient = new QueryClient()
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc'
    })
  ]
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{ colorScheme: 'dark' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// src/App.tsx

import { useAuth } from '@/lib/AuthContext'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from 'router' // Assuming you have a router file

// Create a single, top-level instance of QueryClient.
const queryClient = new QueryClient()

// This is your main application component that provides global contexts.
function App() {
  const auth = useAuth() // This hook can be called here because App is a function component.

  return (
    // QueryClientProvider must be at the top to make its context available to all children.
    <QueryClientProvider client={queryClient}>
      {/* AuthProvider wraps the router so all routes can access auth context. */}
      {/* Assuming AuthProvider also has its own required providers, it's fine here. */}
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  )
}

export default App

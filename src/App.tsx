import { useAuth } from '@/lib/AuthContext'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from '@/routeTree.gen' // Import routeTree, not router

// Create a single, top-level instance of QueryClient.
const queryClient = new QueryClient()

// Create the router instance
const router = createRouter({ routeTree })

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

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
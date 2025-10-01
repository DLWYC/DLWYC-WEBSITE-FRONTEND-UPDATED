import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import type { useAuth } from '@/lib/AuthContext'

// Define the router context type
type RouterContext = {
  auth: ReturnType<typeof useAuth>
}

// Create the router instance with all configurations
export const router = createRouter({
  routeTree,
  context: undefined!, // We'll provide this at render time
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
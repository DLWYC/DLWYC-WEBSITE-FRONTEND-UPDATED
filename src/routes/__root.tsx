import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import NavBar from '@/components/Nav_Bar/Nav_Bar'
import Footer from '@/components/Footer/Footer'
import { GoogleOAuthProvider } from '@react-oauth/google'

export const Route = createRootRoute({
  component: () => {
    const location = useLocation()
    console.log(location.pathname)
    return (
      <>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
          
          {location.pathname.startsWith('/userdashboard') ? null : <NavBar />}
          <Outlet />
          {location.pathname.startsWith('/userdashboard') ? null: <Footer />}
        </GoogleOAuthProvider>
      </>
    )
  },
})

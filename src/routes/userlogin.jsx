import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useAuth} from "@/lib/AuthContext"

export const Route = createFileRoute('/userlogin')({
  component: RouteComponent,
})

function RouteComponent() {
  const {login, loginIsLoading} = useAuth()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const values = {
    email: email.toLowerCase(),
    password: password
  }

    
     const handleLogin = async () =>{
      if(!values.email){
        toast.error("Please Enter Your Email")
        return
      }
      if(!values.password){
        toast.error("Please Enter Your Password")
        return 
      }

      try{
         const res = await login({values})
         toast.success(res?.data?.message)
         navigate({to: '/userdashboard'});
      }
      catch(error){
        toast.error(error?.error || "Login Failed🤧")
      }
      
      console.log("herer", email)
     }
   

  const handleGoogleLogin = (credentialResponse) => {
    console.log(credentialResponse);
    localStorage.setItem("token", credentialResponse.credential);

  };

return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            // type="submit"
            className="w-full bg-primary-main text-white py-2 rounded-lg cursor-pointer hover:bg-reddish duration-100 transition-all"
            onClick={handleLogin}
          >
          {loginIsLoading ? <span class="loader"></span> : "Login"}
          </button>

        </div>

        {/* Google OAuth */}
        <div className="mt-4 flex ">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            // flow: 'auth-code',
            onError={() => alert("Google Login Failed")}
          />
        </div>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../api/users";
import { useAuthStore } from "../store/auth";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuthStore();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        last_name: "",
        password: "",
        re_password: ""
    });

    const { email, name, last_name, password, re_password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerMutation = useMutation({
        mutationFn: () => registerRequest(email, name, last_name, password),
        onSuccess: () => {
            toast.success("Registro exitoso! Hace login!");
            navigate("/login");
        },
        onError: () => {
            toast.error("Hubo un error, intenta de nuevo");
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== re_password) {
            toast.error("Las contraseñas deben coincidir");
            return;
        }
        registerMutation.mutate();
    };

    if (registerMutation.isLoading) return <p>Loading...</p>;
    if (isAuth) return <Navigate to="/" />;

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[800px] lg:py-0">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="/logo.png" alt="logo"/>
            <span>Shop Zone</span>
          </Link>
          <div className="w-full md:w-[400px] lg:w-[500px] bg-slate-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a new account 
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input 
                    value={email}
                    onChange={onChange}
                    type="email" 
                    required
                    name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                </div>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <input 
                    value={name}
                    required
                    onChange={onChange}
                    type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"/>
                </div>
                <div>
                  <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Last name</label>
                  <input 
                    value={last_name}
                    required
                    onChange={onChange}
                    type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name"/>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input 
                    value={password}
                    required
                    onChange={onChange}
                    type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••"/>
                </div>
                <div>
                  <label htmlFor="re-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  <input 
                    value={re_password}
                    required
                    onChange={onChange}
                    type="password" name="re_password" id="re-password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••"/>
                </div>
      
                {password !== re_password && <p className="text-sm font-medium text-red-500">Passwords must match</p>}
      
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Have an account? <Link to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )
    
}
export default RegisterPage;
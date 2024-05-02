"use client";

import AuthInput from "@/components/AuthInput";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState('');
    const handleLogin = (e: any) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/auth/login", { email, password }).then((res) => {
            console.log(res.data);
            setError('')
        }).catch((err) => {
            console.log(err);
            setError(err.response.data.msg)
        });
    };
    return (

        <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <form className="flex flex-col bg-white px-6 py-14 rounded-2xl gap-11 text-gray-600 w-1/4">
            <h1 className="font-bold text=2xl ">LOGIN</h1>
            <AuthInput label="Email:" newState={setEmail} />
            <AuthInput label="Senha:" newState={setPassword} />
            {error.length>0 && <span className="text-red-600">*{error}</span> }
            <button className="bg-green-600 py-3 font-bold text-white rounded-lg hover:bg-green-800" onClick={(e)=>handleLogin(e)}
            >ENTRAR</button>
            <Link href="/register" className="text-center underline">Cadastrar-se</Link>
       </form>
       </main>
    );
}

export default Login;
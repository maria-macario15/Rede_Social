import { useContext, useState } from "react";
import { makeRequest } from "../../../../axios";
import { useNavigate } from 'react-router-dom'


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setUser}= useContext('');

    const router = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        makeRequest.post("auth/login", { email, password }).then((res) => {
            localStorage.setItem("rede-social:user", JSON.stringify(res.data.user)
        );
            setUser(res.data.user);
            setError('');
            router.push('/');
        }).catch((err) => {
            console.log(err);
            setError(err.response.msg);
        });
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black">
            <form className="flex flex-col bg-white px-6 py-14 rounded-2xl gap-11 text-gray-600 w-1/4">
                <h1 className="font-bold text=2xl ">LOGIN</h1>
                <AuthInput label="Email:" newState={setEmail} />
                <AuthInput label="Senha:" newState={setPassword}IsPassword />
                {error.length > 0 && <span className="text-red-600">*{error}</span>}
                <button className="bg-green-600 py-3 font-bold text-white rounded-lg hover:bg-green-800" onClick={(e) => handleLogin(e)}
                >ENTRAR</button>
                <a href="/register" className="text-center underline">Cadastrar-se</a>
            </form>
        </main>
    );
}
export default Login;
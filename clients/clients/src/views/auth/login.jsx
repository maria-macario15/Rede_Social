"use client";
import style from '../auth/login.css'
import { useContext, useState } from "react";

function Login() {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    
 

    async function handleLogin() {
        try {
            const resposta = await fetch("/logar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            if (!resposta.ok) {
                alert("Usuário ou Senha Invalidos!!!")
                throw new Error("Erro na requisição" + resposta.status)
            } else {
                const dados = await resposta.json()
                localStorage.setItem("email", dados.email)
                //window.location.href = "/telaPrincipal"
            }
        } catch (error) {
            console.error("Erro ao fazer login", error)
        }
      
    }
    async function buttonEntrar(){
     
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    }
    async function buttonCadastro(){
  
    const container = document.getElementById('container');
    container.classList.add("right-panel-active");

    }


    return (
       <main>
      
        <div class="container" id="container">
        <div class="form-container sign-up-container">
            <form action="#">
                <h1>Crie sua conta</h1>
                <span>Preencha os campos abaixo:</span>
                <input className='form-control' type="text" placeholder="Nome" value={username} onChange={(e) => setUserName(e.target.value)} />
                <input className='form-control' type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='form-control' type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className='form-control' type="password" placeholder='Confirme Sua Senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                
                <button type="button" class="btn btn-outline-dark">Cadastre-se</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form action="#">
                <h1 className="font-bold text=2xl ">Olá Taruíra!</h1>

                <span>Preencha os campos abaixo e entre:</span>
                <input className='form-control' type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='form-control' type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <a href="#">Esqueceu sua senha?</a>
                <button type="button" class="btn btn-outline-dark" onClick={(e) => handleLogin(e)}>Entre</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Ei, taruíra</h1>
                    <p>Já faz parte da nossa comunidade? </p>
                    <button className="ghost btn btn-outline-dark" onClick={(e) => buttonEntrar(e)}>Entre</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Boas vindas, Taruíra!</h1>
                    <p>Faça seu cadastro e venha fazer parte da nossa comunidade </p>
                    <button className="ghost btn btn-outline-dark" onClick={(e) => buttonCadastro(e)}>Cadastre-se</button>
                </div>
            </div>
        </div>
    </div>
  </main>


    );
}
export default Login;
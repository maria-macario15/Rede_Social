// Importação do arquivo de estilo CSS
import '../auth/login.css';
// Importação do useState do React
import { useState } from "react";
import Cookies from 'js-cookie';



// Componente funcional Login
function Login() {
    // Estados para os campos do formulário e mensagens de erro/sucesso
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [perg, setPerg] = useState('');
    // Função assíncrona para cadastrar usuário
    async function cadastrarUsuario(event) {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        // Objeto com os dados do usuário
        const usuarioData = {
            username,
            email,
            password,
            confirmPassword,
            perg
        };

        try {
            // Fazendo requisição POST para a API de registro
            const resposta = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioData)
            });

            // Convertendo a resposta para JSON
            const data = await resposta.json();

            // Verificando se a requisição foi bem-sucedida
            if (!resposta.ok) {
                console.debug("Erro ao criar usuário");
                setError(data.msg || "Erro desconhecido");
                setSuccess('');
            } else {
                alert('Usuário Cadastrado');
                console.debug("Usuário Inserido");
                setSuccess(data.msg);
                setError('');
                window.location.href = '/login';
            }

        } catch (error) {
            console.debug(error);
            setError(error.message);
            setSuccess('');
        }
    }

    // Função assíncrona para realizar login
    async function handleLogin(event) {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        try {
            // Fazendo requisição POST para a API de login
            const resposta = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            // Verificando se a requisição foi bem-sucedida
            if (!resposta.ok) {
                alert("Usuário ou Senha Inválidos!!!");
                throw new Error("Erro na requisição " + resposta.status);
            } else {
                const dados = await resposta.json();
                localStorage.setItem("accessToken", dados.token);
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Erro ao fazer login", error);
        }
    }

    // Função para alternar para o painel de login
    function buttonEntrar(event) {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        const cont = document.getElementById('cont');
        cont.classList.remove("right-panel-active");
    }

    // Função para alternar para o painel de cadastro
    function buttonCadastro(event) {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        const cont = document.getElementById('cont');
        cont.classList.add("right-panel-active");
    }


    // Retorno do componente Login
    return (
        <main>
            <div className="cont" id="cont">
                {/* Painel de Cadastro */}
                <div className="form-cont sign-up-cont">
                    <form onSubmit={cadastrarUsuario}>
                        <h1>Crie sua conta</h1>
                        <span>Preencha os campos abaixo:</span>
                        {/* Inputs para nome, email, senha e confirmação de senha */}
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Nome"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <input
                            className="form-control"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /><br />
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Selecione a Pergunta de Segurança</option>
                            <option value="1">Qual o nome da sua mãe?</option>
                            <option value="2">Qual é o nome do seu primeiro animal de estimação?</option>
                            <option value="3">Qual é o nome da cidade onde você nasceu?</option>
                        </select>
                        <input
                            className="form-control "
                            type="text"
                            placeholder="Resposta de Segurança"
                            value={perg}
                            onChange={(e) => setPerg(e.target.value)}

                        /> <br />
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            className="form-control "
                            type="password"
                            placeholder="Confirme Sua Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {/* Mensagens de erro e sucesso */}
                        {error && <span className="text-red-600">*{error}</span>}
                        {success && <span className="text-green-600">*{success}</span>}
                        {/* Botão de cadastro */}

                        <button type="submit" className="btn btn-outline-dark ">Cadastre-se</button>
                    </form>
                </div>

                {/* Painel de Login */}
                <div className="form-cont sign-in-cont">
                    <form onSubmit={handleLogin}>
                        <h1 className="font-bold text-2xl">Olá Taruíra!</h1>
                        <span>Preencha os campos abaixo e entre:</span>
                        {/* Inputs para email e senha */}
                        <input
                            className="form-control"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Link para recuperação de senha */}
                        <a data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" href="#staticBackdrop">
                            Esqueceu sua senha?</a>
                        {/* Botão de login */}
                        <button type="submit" className="btn btn-outline-dark">Entre</button>
                    </form>
                </div>

                {/* Overlay para alternar entre painéis de login e cadastro */}
                <div className="overlay-cont">
                    <div className="overlay">
                        {/* Painel esquerdo do overlay */}
                        <div className="overlay-panel overlay-left">
                            <h1>Ei, taruíra</h1>
                            <p>Já faz parte da nossa comunidade?</p>
                            <button className="ghost btn btn-outline-dark" onClick={buttonEntrar}>Entre</button>
                        </div>
                        {/* Painel direito do overlay */}
                        <div className="overlay-panel overlay-right">
                            <h1>Boas vindas, Taruíra!</h1>
                            <p>Faça seu cadastro e venha fazer parte da nossa comunidade</p>
                            <button className="ghost btn btn-outline-dark" onClick={buttonCadastro}>Cadastre-se</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*RECUPERAÇÃO DE SENHA*/}
            <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="staticBackdropLabel">Recuperação de Senha</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Nome" />
                        <input
                            className="form-control"
                            type="email"
                            placeholder="E-mail" />
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Resposta de Segurança" />
                    </div>
                    <button type="submit" className="btn btn-outline-dark">Recupere</button>
                </div>
            </div>
        </main>


    );
}

export default Login;
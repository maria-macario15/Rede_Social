import jwt from "jsonwebtoken"; // Importa o módulo jwt para lidar com tokens JWT
import { db } from "../connect.js"; // Importa a conexão com o banco de dados MySQL
import bcrypt from "bcrypt"; // Importa o módulo bcrypt para hashing de senhas

// Função para registrar um novo usuário
export const register = (req, res) => {
    const { username, email, password, confirmPassword, perg } = req.body;

    // Validação dos campos obrigatórios
    if (!username) {
        return res.status(422).json({ msg: "O nome é obrigatório" });
    }
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório" });
    }
    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória" });
    }
    if (password !== confirmPassword) {
        return res.status(422).json({ msg: "As senhas não são iguais" });
    }
    if (!perg) {
        return res.status(422).json({ msg: "Tem que responder a pergunta Secreta" });
    }

    // Verifica se o email já está sendo utilizado
    db.query("SELECT email FROM user WHERE email = ?",
        [email],
        async (error, data) => {
            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde" });
            }
            if (data.length > 0) {
                return res.status(500).json({ msg: "Este email já está sendo utilizado" });
            } else {
                // Hash da senha antes de armazenar no banco de dados
                const passwordHash = await bcrypt.hash(password, 8);
                const passwordHash2 = await bcrypt.hash(perg, 8);
                // Insere o usuário no banco de dados
                db.query(
                    "INSERT INTO user SET ?", { username, email, password: passwordHash, perg: passwordHash2 },
                    (error) => {
                        if (error) {
                            console.debug(error);
                            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!" });
                        } else {
                            return res.status(200).json({ msg: "Cadastro efetuado com sucesso!!" });
                        }
                    }
                )
            }
        })
};

// Função para fazer login de usuário
export const login = (req, res) => {
    const { email, password } = req.body;

    // Consulta no banco de dados para encontrar o usuário pelo email
    db.query(
        "SELECT * FROM user WHERE email = ?", [email],
        async (error, data) => {
            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!" });
            }
            if (data.length === 0) {
                return res.status(404).json({ msg: "Usuário ou senha incorreta!" });
            } else {
                const user = data[0];

                // Verifica se a senha fornecida corresponde à senha hash armazenada
                const checkPassword = await bcrypt.compare(password, user.password);

                if (!checkPassword) {
                    return res.status(422).json({ msg: "Usuário ou senha incorreta!!" });
                }

                try {
                    // Gera tokens JWT (Access Token e Refresh Token)
                    const refreshToken = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // Expira em 24 horas
                        id: user.password // Usando password como identificador no token (não recomendado, melhor usar um ID único)
                    },
                        process.env.REFRESH, // Chave secreta para assinar o token de refresh
                        { algorithm: "HS256" }
                    );

                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + 3600, // Expira em 1 hora
                        id: user.password // Usando password como identificador no token (não recomendado, melhor usar um ID único)
                    },
                        process.env.TOKEN, // Chave secreta para assinar o access token
                        { algorithm: "HS256" }
                    );

                    delete user.password; // Remove a senha do objeto do usuário antes de enviar na resposta

                    // Define cookies com os tokens JWT e envia resposta de sucesso
                    res.cookie("accessToken", token, {
                        httpOnly: true // Apenas acessível via HTTP(S)
                    }).cookie("refreshToken", refreshToken, {
                        httpOnly: true // Apenas acessível via HTTP(S)
                    }).status(200).json({ msg: "Usuário logado com sucesso!", user });
                } catch (err) {
                    console.debug(err);
                    return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" });
                }
            }
        }
    )
};

// Função para realizar logout
export const logout = (req, res) => {
    return res
        .clearCookie("accessToken", { secure: true, sameSite: "none" }) // Limpa o cookie de access token
        .clearCookie("refreshToken", { secure: true, sameSite: "none" }) // Limpa o cookie de refresh token
        .status(200)
        .json({ msg: "Logout efetuado com sucesso" });
};

// Função para atualizar o token de acesso (refresh token)
export const refresh = (req, res) => {
    const authHeader = req.headers.cookie?.split("; ")[1]; // Obtém o refresh token do header de cookies
    const refresh = authHeader && authHeader.split('=')[1]; // Extrai o valor do refresh token

    const tokenStruct = refresh.split('.')[1]; // Extrai a parte do payload do token JWT
    const payload = atob(tokenStruct); // Decodifica o payload do token

    try {
        // Gera um novo refresh token com expiração de 24 horas
        const refreshToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            id: JSON.parse(payload).id,
        },
            process.env.REFRESH, // Chave secreta para assinar o token de refresh
            { algorithm: "HS256" }
        );

        // Gera um novo access token com expiração de 1 hora
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 3600,
            id: JSON.parse(payload).id,
        },
            process.env.TOKEN, // Chave secreta para assinar o access token
            { algorithm: "HS256" }
        );

        // Define cookies com os novos tokens JWT e envia resposta de sucesso
        res.cookie("accessToken", token, {
            httpOnly: true // Apenas acessível via HTTP(S)
        }).cookie("refreshToken", refreshToken, {
            httpOnly: true // Apenas acessível via HTTP(S)
        }).status(200).json({ msg: "Token atualizado com sucesso" });
    } catch (err) {
        console.debug(err);
        return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" });
    }
};
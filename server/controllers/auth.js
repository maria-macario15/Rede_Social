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

    db.query("SELECT * FROM user WHERE email = ?", [email], async (error, data) => {
        if (error) {
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!" });
        }
        if (data.length === 0) {
            return res.status(404).json({ msg: "Usuário ou senha incorreta!" });
        } else {
            const user = data[0];
            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                return res.status(422).json({ msg: "Usuário ou senha incorreta!!" });
            }

            try {
                const token = jwt.sign(
                    { exp: Math.floor(Date.now() / 1000) + 3600, id: user.id },
                    process.env.TOKEN,
                    { algorithm: "HS256" }
                );

                res.status(200).json({ msg: "Usuário logado com sucesso!", token });
            } catch (err) {
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" });
            }
        }
    });
};


// Função para realizar logout
export const logout = (req, res) => {
    res.status(200).json({ msg: "Logout efetuado com sucesso" });
};
// Função para atualizar o token de acesso (refresh token)
export const refresh = (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Obtém o token JWT do header Authorization

    if (!token) {
        return res.status(401).json({ msg: "Token não encontrado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        const refreshToken = jwt.sign(
            { exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, id: decoded.id },
            process.env.REFRESH,
            { algorithm: "HS256" }
        );

        const newToken = jwt.sign(
            { exp: Math.floor(Date.now() / 1000) + 3600, id: decoded.id },
            process.env.TOKEN,
            { algorithm: "HS256" }
        );

        res.status(200).json({ token: newToken });
    } catch (err) {
        console.debug(err);
        return res.status(403).json({ msg: "Token inválido" });
    }
};
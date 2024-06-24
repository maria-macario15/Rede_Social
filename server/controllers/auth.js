import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {
    const { username, email, password, confirmPassword, perg } = req.body;
    if (!username) {
        return res.status(422.).json({ msg: "O nome é obrigatorio" });
    }
    if (!email) {
        return res.status(422.).json({ msg: "O email é obrigatorio" });
    }
    if (!password) {
        return res.status(422.).json({ msg: "a senha é obrigatoria" });
    }
    if (password !== confirmPassword) {
        return res.status(422.).json({ msg: "As senhas não são iguais" });
    }
    if (!perg) {
        return res.status(422).json({ msg: "Tem que responder a pergunta Secreta" });
    }
    db.query("SELECT email FROM user WHERE email = ?",
        [email],
        async (error, data) => {
            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde" });
            }
            if (data.length > 0) {
                return res.status(500).json({ msg: "Este email já esta sendo utilizado" });
            } else {
                const passwordHash = await bcrypt.hash(password, 8);
                const passwordHash2 = await bcrypt.hash(perg, 8);
                db.query(
                    "INSERT INTO user SET ?", { username, email, password: passwordHash, perg: passwordHash2 },
                    (error) => {
                        if (error) {
                            console.debug(error);
                            return res.status(500).json({ msg: "Aconteceu algum erro no Servidor, tente novamente mais tarde!" });
                        } else {
                            return res.status(200).json({ msg: "Cadastro efetuado com sucesso!!" });
                        }
                    }
                )
            }
        })
};

export const login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT*FROM user WHERE email =?", [email],
        async (error, data) => {

            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!" });

            }
            if (data.length === 0) {
                return res.status(404).json({ msg: "Usuario ou senha incorreta!" })
            } else {
                const user = data[0];

                const checkPassword = await bcrypt.compare(password, user.password)

                if (!checkPassword) {
                    return res.status(422).json({ msg: "Usuario ou senha incorreta!!" })
                }
                try {

                    const refreshToken = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                        id: user.password
                    },
                        //node -e "console.log(require('crypto').randomBytes(256).toString('base64'));" 
                        //COMANDO PARA CRIAR A CHAVE DE CRIPTO GRAFIA 
                        process.env.REFRESH,
                        { algorithm: "HS256" }
                    )
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + 3600,
                        id: user.password
                    },
                        process.env.TOKEN,
                        { algorithm: "HS256" }
                    );
                    console.debug(token)
                    
                  res.status(200).json({msg:"Usuario logado com sucesso!", 
                    data:{user, token:{token,refreshToken}}
                })
                } catch (err) {
                    console.debug(err);
                    return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" })
                }
            }
        }

    )

};

export const logout = (req, res) => {
    res.status(200).json({ msg: "Logout efetuado com sucesso" });
};



export const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ msg: "Refresh token não fornecido!" });
    }

    try {
        // Verifica o token de atualização
        const decoded = jwt.verify(refreshToken, process.env.REFRESH);

        // Gera novo token de acesso
        const accessToken = jwt.sign({
            id: decoded.id
        },
            process.env.TOKEN,
            { expiresIn: '1h' } // Expira em 1 hora
        );

        // Gera novo token de atualização
        const newRefreshToken = jwt.sign({
            id: decoded.id
        },
            process.env.REFRESH,
            { expiresIn: '24h' } // Expira em 24 horas
        );

        res.status(200).json({
            msg: "Token atualizado com sucesso",
            tokens: {
                accessToken,
                refreshToken: newRefreshToken
            }
        });

    } catch (err) {
        console.debug(err);
        return res.status(403).json({ msg: "Refresh token inválido!" });
    }
};
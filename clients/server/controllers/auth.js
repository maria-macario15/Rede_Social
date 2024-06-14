import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
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
                db.query(
                    "INSERT INTO user SET?", { username, email, password: passwordHash },
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
                    delete user.password;
                    res.cookie("accessToken",token,{
                        httpOnly: true
                    }).cookie("refreshToken",refreshToken,{
                        httpOnly: true
                    }).status(200).json({ msg: "Usuario logado com sucesso!", user })
                } catch (err) {
                    console.debug(err);
                    return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" })
                }
            }
        }

    )

};

export const logout = (req,res)=>{
    return res
    .clearCookie("accessToken", { secure: true, sameSite: "none"})
    .clearCookie("refreshToken", { secure: true, sameSite: "none"})
    .status(200)
    .json({msg: "Logout efetuado com sucesso"});


};

 export const refresh =(req,res)=>{
    const authHeader = req.headers.cookie?.split("; ")[1];
    const refresh = authHeader&& authHeader.split('=')[1];

    const tokenStruct = refresh.split('.')[1];
    const payload = atob(tokenStruct);

    try {

        const refreshToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            id: JSON.parse(payload).id,
        },
            //node -e "console.log(require('crypto').randomBytes(256).toString('base64'));" 
            //COMANDO PARA CRIAR A CHAVE DE CRIPTO GRAFIA 
            process.env.REFRESH,
            { algorithm: "HS256" }
        )
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 3600,
            id: JSON.parse(payload).id,
        },
            process.env.TOKEN,
            { algorithm: "HS256" }
        );
        res.cookie("accessToken",token,{
            httpOnly: true
        }).cookie("refreshToken",refreshToken,{
            httpOnly: true
        }).status(200).json({ msg: "Token atualizado com sucesso",  })
    } catch (err) {
        console.debug(err);
        return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" })
    }

}
import jwt from "jsonwebtoken"; // Importa a biblioteca jsonwebtoken para lidar com tokens JWT

// Middleware para verificar a validade do refresh token
export const checkRefreshToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ msg: "Refresh token não fornecido!" });
    }

    jwt.verify(refreshToken, process.env.REFRESH, (err, user) => {
        if (err) {
            console.debug(err);
            return res.status(403).json({ msg: "Refresh token inválido!" });
        }

        const newToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
            id: user.id
        },
            process.env.TOKEN,
            { algorithm: "HS256" }
        );

        res.status(200).json({
            msg: "Novo token gerado com sucesso!",
            token: newToken
        });
    });
};
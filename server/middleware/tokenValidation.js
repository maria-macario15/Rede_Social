import jwt from "jsonwebtoken"; // Importa a biblioteca jsonwebtoken para lidar com tokens JWT

// Middleware para verificar a validade do token de acesso
export const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" });
    }

    jwt.verify(token, process.env.TOKEN, (err, user) => {
        if (err) {
            console.debug(err);
            return res.status(403).json({ msg: "Token inválido!" });
        }

        req.user = user;
        next();
    });
};
import jwt from "jsonwebtoken"; // Importa a biblioteca jsonwebtoken para lidar com tokens JWT

// Middleware para verificar a validade do refresh token
export const checkRefreshToken = (req, res, next) => {
    const authHeader = req.headers.cookie?.split("; ")[1]; // Obtém o cabeçalho de autenticação (cookie)
    const refresh = authHeader && authHeader.split("=")[1]; // Extrai o token de atualização (refresh token) do cookie

    if (refresh) { // Verifica se o refresh token foi fornecido
        try {
            jwt.verify(refresh, process.env.REFRESH); // Verifica a validade do refresh token usando a chave secreta (process.env.REFRESH)
            next(); // Chama a próxima função middleware ou rota se o token for válido
        } catch (error) {
            console.debug(error);
            res.status(400).json({ msg: "Token inválido" }); // Retorna um erro 400 se o token não for válido
        }
    } else {
        return res.status(401).json({ msg: "Acesso negado" }); // Retorna um erro 401 se o token não foi fornecido
    }
};
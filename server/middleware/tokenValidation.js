import jwt from "jsonwebtoken"; // Importa a biblioteca jsonwebtoken para lidar com tokens JWT

// Middleware para verificar a validade do token de acesso
export const checkToken = (req, res, next) => {
    const authHeader = req.headers.cookie?.split("; ")[0]; // Obtém o cabeçalho de autenticação (cookie)
    const token = authHeader && authHeader.split("=")[1]; // Extrai o token de acesso (access token) do cookie

    if (token) { // Verifica se o access token foi fornecido
        try {
            jwt.verify(token, process.env.TOKEN); // Verifica a validade do access token usando a chave secreta (process.env.TOKEN)
            next(); // Chama a próxima função middleware ou rota se o token for válido
        } catch (error) {
            console.debug(error);
            res.status(400).json({ msg: "Token inválido" }); // Retorna um erro 400 se o token não for válido
        }
    } else {
        return res.status(401).json({ msg: "Acesso negado" }); // Retorna um erro 401 se o token não foi fornecido
    }
};
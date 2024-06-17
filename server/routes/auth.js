import express from "express"; // Importa o framework Express para gerenciar rotas
import { register, login, refresh, logout } from '../controllers/auth.js'; // Importa os controladores de autenticação
import { checkToken } from "../middleware/tokenValidation.js"; // Importa o middleware para validar o token de acesso
import { checkRefreshToken } from "../middleware/refreshTokenValidation.js"; // Importa o middleware para validar o token de atualização

const router = express.Router(); // Cria um objeto Router do Express para gerenciar rotas

// Define rotas e associa cada uma com seu respectivo controlador/middleware
router.post("/register", register); // Rota para registrar um novo usuário
router.post("/login", login); // Rota para autenticar o login de um usuário
router.post("/logout", checkToken, logout); // Rota para realizar logout, verifica o token de acesso antes
router.get("/refresh", checkRefreshToken, refresh); // Rota para atualizar o token de acesso, verifica o token de atualização antes

export default router;
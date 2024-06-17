import express from "express";
import { creatComment, getComment } from "../controllers/comment.js"; // Importa funções do controlador de comentários
import { checkToken } from "../middleware/tokenValidation.js"; // Importa middleware de validação de token

const router = express.Router(); // Cria uma instância de router do Express

// Rota POST para criar um novo comentário
router.post("/", checkToken, creatComment);

// Rota GET para obter todos os comentários de um post
router.get("/", checkToken, getComment);

export default router;
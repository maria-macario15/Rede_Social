import express from 'express';
import { upload, uploadController } from '../controllers/upload.js'; // Importa funções do controlador de upload

const router = express.Router(); // Cria uma instância de router do Express

// Rota POST para manipular o upload de arquivos
router.post('/', upload.single('file'), uploadController);

export default router;
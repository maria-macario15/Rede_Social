import mysql from "mysql"; // Importa o módulo MySQL para Node.js
import dotenv from "dotenv"; // Importa o módulo dotenv para carregar variáveis de ambiente

dotenv.config({ path: "./.env" }); // Configura o dotenv para carregar variáveis de ambiente do arquivo .env

// Exporta uma conexão com o banco de dados MySQL
export const db = mysql.createConnection({
    host: process.env.DB_HOST, // Obtém o host do banco de dados do arquivo .env
    user: process.env.DB_USER, // Obtém o usuário do banco de dados do arquivo .env
    password: process.env.DB_PASS, // Obtém a senha do banco de dados do arquivo .env
    database: process.env.DB, // Obtém o nome do banco de dados do arquivo .env
});
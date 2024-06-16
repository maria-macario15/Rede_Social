import { db } from "../connect.js"; // Importa a conexão com o banco de dados MySQL

// Função para buscar usuários por nome de usuário
export const searchUser = (req, res) => {
    const params = "%" + req.query.params + "%";

    // Verifica se o parâmetro de busca foi fornecido
    if (!params) {
        return res.status(422).json({ msg: 'É necessário fornecer um parâmetro de busca' });
    }

    // Consulta SQL para buscar usuários cujo nome de usuário corresponde ao parâmetro fornecido
    db.query('SELECT username, user_img, id FROM user WHERE username LIKE ?', [params], (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" });
        } else {
            return res.status(200).json(data); // Retorna os dados dos usuários encontrados em formato JSON
        }
    });
};

// Função para buscar posts por descrição do post ou nome de usuário do autor
export const searchPost = (req, res) => {
    const params = "%" + req.query.params + "%";

    // Verifica se o parâmetro de busca foi fornecido
    if (!params) {
        return res.status(422).json({ msg: 'É necessário fornecer um parâmetro de busca' });
    }

    // Consulta SQL para buscar posts cuja descrição do post ou nome de usuário do autor corresponde ao parâmetro fornecido
    db.query("SELECT p.*, u.username, u.user_img FROM posts as p JOIN user as u ON (u.id = p.userId) WHERE p.post_desc LIKE ? OR u.username LIKE ? ORDER BY created_at DESC",
        [params, params],
        (error, data) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" });
            } else {
                return res.status(200).json(data); // Retorna os dados dos posts encontrados em formato JSON
            }
        });
};
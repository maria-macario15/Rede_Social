import { db } from "../connect.js"; // Importa a conexão com o banco de dados MySQL

// Função para criar um novo comentário
export const creatComment = (req, res) => {
    const { comment_desc, post_id, comment_user_id } = req.body;

    // Validação do campo obrigatório
    if (!comment_desc) {
        return res.status(422).json({ msg: "O comentário precisa ter um texto!" });
    }

    // Insere o comentário no banco de dados
    db.query('INSERT INTO comments SET ?', { comment_desc, post_id, comment_user_id }, (error) => {
        if (error) {
            console.debug(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
        } else {
            return res.status(200).json({ msg: "Comentário enviado com sucesso!" });
        }
    });
};

// Função para obter todos os comentários de um determinado post
export const getComment = (req, res) => {
    const postId = req.query.post_id; // Obtém o ID do post a partir dos parâmetros da requisição

    // Consulta no banco de dados para obter os comentários do post
    db.query("SELECT c.*, u.username, u.user_img FROM comments as c JOIN user as u ON (u.id = c.comment_user_id) WHERE post_id = ? ORDER BY created_at DESC",
        postId,
        (error, data) => {
            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
            } else if (data) {
                return res.status(200).json(data); // Retorna os dados dos comentários em formato JSON
            }
        }
    );
};
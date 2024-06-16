import { db } from "../connect.js"; // Importa a conexão com o banco de dados MySQL

// Função para adicionar um novo like a um post
export const addLikes = (req, res) => {
    const { likes_user_id, likes_pos_id } = req.body;

    // Insere o like na tabela 'likes'
    db.query('INSERT INTO likes SET ?', { likes_user_id, likes_pos_id }, (error) => {
        if (error) {
            console.debug(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
        } else {
            return res.status(200).json({ msg: "Curtido o post com sucesso!" });
        }
    });
};

// Função para excluir um like existente de um post
export const deleteLikes = (req, res) => {
    const { likes_user_id, likes_post_id } = req.query;

    // Deleta o like da tabela 'likes' baseado nos IDs do usuário que curtiu e do post
    db.query("DELETE FROM likes WHERE likes_user_id = ? AND likes_pos_id = ?", [likes_user_id, likes_post_id], (error) => {
        if (error) {
            console.debug(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
        } else {
            return res.status(200).json({ msg: "Like deletado com sucesso!" });
        }
    });
};

// Função para obter todos os likes de um determinado post
export const getLikes = (req, res) => {
    const { likes_post_id } = req.query;

    // Consulta no banco de dados para obter todos os likes do post específico
    db.query("SELECT l.*, u.username FROM likes as l JOIN user as u ON (u.id = l.likes_user_id) WHERE likes_pos_id = ?",
        [likes_post_id],
        (error, data) => {
            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
            } else if (data) {
                return res.status(200).json(data); // Retorna os dados dos likes em formato JSON
            }
        }
    );
};
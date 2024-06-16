import { db } from "../connect.js"; // Importa a conexão com o banco de dados MySQL

// Função para adicionar uma nova amizade
export const addFriendShip = (req, res) => {
    const { follower_id, followed_id } = req.body;

    // Insere a nova amizade na tabela 'friendship'
    db.query('INSERT INTO friendship SET ?', { follower_id, followed_id }, (error) => {
        if (error) {
            console.debug(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
        } else {
            return res.status(200).json({ msg: "Amizade realizada com sucesso!" });
        }
    });
};

// Função para excluir uma amizade existente
export const deleteFriendShip = (req, res) => {
    const { follower_id, followed_id } = req.query;

    // Deleta a amizade da tabela 'friendship' baseado nos IDs do seguidor e seguido
    db.query("DELETE FROM friendship WHERE follower_id = ? AND followed_id = ?", [follower_id, followed_id], (error) => {
        if (error) {
            console.debug(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
        } else {
            return res.status(200).json({ msg: "Amizade destruída com sucesso!" });
        }
    });
};

// Função para obter todas as amizades de um determinado usuário (seguidor)
export const getFriendShip = (req, res) => {
    const { follower_id } = req.query;

    // Consulta no banco de dados para obter todas as amizades do seguidor específico
    db.query("SELECT f.*, u.username, u.user_img FROM friendship as f JOIN user as u ON (u.id = f.followed_id) WHERE follower_id = ?",
        [follower_id],
        (error, data) => {
            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
            } else if (data) {
                return res.status(200).json(data); // Retorna os dados das amizades em formato JSON
            }
        }
    );
};
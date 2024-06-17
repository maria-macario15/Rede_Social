import { db } from "../connect.js"; // Importa a conexão com o banco de dados MySQL

// Função para buscar informações de um usuário específico pelo ID
export const getUser = (req, res) => {
    const id = req.query.id;

    // Verifica se o ID do usuário foi fornecido
    if (!id) {
        return res.status(422).json({ msg: 'É necessário fornecer o ID do usuário' });
    }

    // Consulta SQL para buscar informações do usuário pelo ID fornecido
    db.query('SELECT username, user_img, bg_img FROM user WHERE id = ?', [id], (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" });
        } else {
            return res.status(200).json(data); // Retorna os dados do usuário encontrado em formato JSON
        }
    });
};

// Função para atualizar informações do usuário
export const updateUser = (req, res) => {
    const { username, user_img, bg_img, id } = req.body;

    // Verifica se todos os campos necessários foram fornecidos para atualização
    if (!username || !user_img || !bg_img) {
        return res.status(422).json({ msg: 'É necessário fornecer username, user_img e bg_img para atualização' });
    }

    // Consulta SQL para atualizar informações do usuário no banco de dados
    db.query('UPDATE user SET username = ?, user_img = ?, bg_img = ? WHERE id = ?', [username, user_img, bg_img, id], (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!" });
        } else if (data.affectedRows > 0) {
            return res.status(200).json('Usuário atualizado com sucesso'); // Retorna mensagem de sucesso se a atualização foi bem-sucedida
        } else {
            return res.status(404).json({ msg: 'Usuário não encontrado' }); // Retorna mensagem de erro se nenhum usuário foi encontrado para atualização
        }
    });
};
import { db } from "../connect.js";

export const creatComment = (req, res) => {
    const { comment_desc, post_id, comment_user_id } = req.body;
    if (!comment_desc) {
        return res.status(422).json({ msg: " O comentário precisa ter um texto ! " });
    }
    db.query('INSERT INTO comments SET ?', { comment_desc, post_id, comment_user_id}, (error) => {
        if (error) {
            console.debug(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
        } else {
            return res.status(200).json({ msg: "`Comentário enviado com sucesso!" });
        }
    })
};
export const getComment = (req, res) => {
    db.query("SELECT c.*, u.username, u.user_img FROM comments as c JOIN user as u ON (u.id = c.comment_user_id) where post_id = ?  ORDER BY created_at DESC",
    req.query.post_id,
        (error, data) => {
            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
            } else if (data) {
                return res.status(200).json(data);
            }
        })
}

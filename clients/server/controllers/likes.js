import { db } from "../connect.js";

export const addLikes = (req, res) => {
    const { likes_user_id, likes_pos_id } = req.body;

    db.query('INSERT INTO likes SET ?', { likes_user_id, likes_pos_id }, (error) => {
        if (error) {
            console.debug(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
        } else {
            return res.status(200).json({ msg: "`Curtido o post com sucesso!" });
        }
    })
};

export const deleteLikes = (req, res) => {
    const { likes_user_id, likes_post_id } = req.query
    db.query("DELETE FROM likes where 'likes_user_id ' = ? AND 'likes_pos_id'=?", [likes_user_id, likes_post_id], (erro) => {
        if (error) {
            console.debug(error)
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!!" })
        }else {
            return res.status(200).json({ msg: "like deletado com sucesso!" });
        }
    })


}

export const getLikes = (req, res) => {
    db.query("SELECT    l.*, u.username FROM likes as l JOIN user as u ON (u.id = l.likes_user_id) WHERE LIKES_POST_ID = ?",
        [req.query.likes.post.id],

        (error, data) => {
            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
            } else if (data) {
                return res.status(200).json(data);
            }
        })

}



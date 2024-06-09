import { db } from "../connect.js";

export const addFrindShip = (req, res) => {
    
    const { follower_id, followed_id } = req.body;

    db.query('INSERT INTO friendship SET ?', { follower_id, followed_id }, (error) => {
        if (error) {
            console.debug(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
        } else {
            return res.status(200).json({ msg: "amizade realizada com sucesso !" });
        }
    })
};

export const deleteFrindShip = (req, res) => {
    const { follower_id, followed_id} = req.query
    db.query("DELETE FROM friendship where 'follower_id ' = ? AND 'followed_id'=?", [follower_id, followed_id], (erro) => {
        if (error) {
            console.debug(error)
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!!" })
        }else {
            return res.status(200).json({ msg: "amizade destroida com sucesso!"   });
        }
    })


}

export const getFrindShip = (req, res) => {
    db.query("SELECT    f.*, u.username,user_img FROM friendship as f JOIN user as u ON (u.id = f.followed_id) WHERE follower_id = ?",
        [req.query.follower_id],

        (error, data) => {
            if (error) {
                console.debug(error);
                return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!!!!" });
            } else if (data) {
                return res.status(200).json(data);
            }
        })

}



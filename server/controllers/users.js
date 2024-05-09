import {db} from '../connect'
export const getUser = (req,res)=>{
    const id = req.query.id

    if (id){
        return res.status(422).json({msg:'Precisamos do id do usuario'})
    }

    db.query(`SELECT username, userImg, bgImg FROM users WHERE id = ?`, [id], (error, data)=>{
        if (error){
            console.log(error)
            return res.status(500).json({msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!"
        });
     }else{
        return res.status(200).json(data)
     }
    })



}
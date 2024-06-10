import { db } from "../connect.js";

export const getUser = (req,res)=>{
   const id = req.query.id;

   if(!id){
    return res.status(422).json({msg:'Precisa do id do usuario'})
   }
   db.query('SELECT username, user_img, bg_img from user WHERE id = ?',[id],(error,data)=>{
    if(error){
        console.error(error);
        return res.status(500).json({msg:"Aconteceu algum erro no servidor, tente novamente mais Tarde !!!",});
    
    }else{
        return res.status(200).json(data)
    }
   })
};

export const updateUser = (req,res)=>{
    const {username, user_img, bg_img, id} = req.body
 
    if(!username|| !user_img|| !bg_img){
     return res.status(422).json({msg:'sem alteraçoes para serem feitas'})
    }
    db.query('UPDATE user SET username = ? user_img = ? bg_img = ? where id = ?',[username, user_img, bg_img, id],(error,data)=>{
     if(error){
         console.error(error);
         return res.status(500).json({msg:"Aconteceu algum erro no servidor, tente novamente mais Tarde !!!",});
     
     }else if(data.affectedRows > 0) {
         return res.status(200).json('atualizado com sucesso')
     }
    })
 };
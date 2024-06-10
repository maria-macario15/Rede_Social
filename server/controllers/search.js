import { db } from "../connect.js";

export const searchUser = (req,res)=>{
   const params = "%" + req.query.params+ "%";

   if(!params){
    return res.status(422).json({msg:'Precisa do parametro'})
   }
   db.query('SELECT username, user_img, id from user WHERE username LIKE ?',[params],(error,data)=>{
    if(error){
        console.error(error);
        return res.status(500).json({msg:"Aconteceu algum erro no servidor, tente novamente mais Tarde !!!",});
    
    }else{
        return res.status(200).json(data)
    }
   })
}

export const searchPost = (req,res)=>{
    const params = "%" + req.query.params+ "%";
 
    if(!params){
     return res.status(422).json({msg:'Precisa do parametro'})
    }
    db.query("SELECT p.*, u.username, u.user_img FROM posts as p JOIN user as u ON (u.id = p.userId) WHERE p.post_desc LIKE ? OR u.username LIKE ORDER BY created_at DESC",[params],(error,data)=>{
     if(error){
         console.error(error);
         return res.status(500).json({msg:"Aconteceu algum erro no servidor, tente novamente mais Tarde !!!",});
     
     }else{
         return res.status(200).json(data)
     }
    })
 }
 
 
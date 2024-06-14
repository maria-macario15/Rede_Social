import jwt from "jsonwebtoken";

export const checkToken =(req, res, next)=>{
    const authHeader = req.headers.cookie?.split("; ")[0];
    const token =authHeader && authHeader.split("=")[1];

    if(token){
        try{
            jwt.verify(token, process.env.TOKEN);
            next();
        }catch(error){
            console.debug(error);
            res.status(400).json({msg: "Token invalidado"});
        }
    }else{
        return res.status(401).json({msg:"acesso negado"});
    }


}

import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "../client/rede-social/public/upload")
    },
    filename: function(req, file, cb){
        cb(null, date.now() + file.originalname)
    }
})

export const upload = multer({ storage: storage});

export const uploadController = (req, res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
}
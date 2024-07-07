import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cd(null,file.originalname)
  }
})

const upload = multer({ 
  
  storage: storage })//storage


export{ storage }
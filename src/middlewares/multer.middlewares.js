import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('des')
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    console.log('fi')
    cb(null, file.originalname)
  } 
})

export const upload = multer({ 
  storage,
})


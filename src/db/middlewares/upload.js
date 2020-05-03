const multer = require('multer')

const uploadPicture = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { 
            return cb(new Error('Please upload a valid image.'))
        }
        cb(undefined, true) 
    }
})

const uploadPdf = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(pdf)$/)) { 
            return cb(new Error('Please upload a pdf file.'))
        }
        cb(undefined, true) 
    }
})

module.exports = {
    uploadPicture,
    uploadPdf
}
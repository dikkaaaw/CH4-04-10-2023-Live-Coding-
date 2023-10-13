const multer = require("multer")

const multerFiltering = (req, file, cb) => {
    if(file.nimtype == 'image/png' | file.nimtype == 'image/jpg' | file.nimtype == 'image/jpeg') {
        cb(null, true)
    } else {
        return cb('Hanya format image saja!')
    }
}
const upload = multer({
    fileFilter: multerFiltering
})

module.exports = upload
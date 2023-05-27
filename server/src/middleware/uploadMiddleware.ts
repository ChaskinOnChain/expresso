import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
const maxSize = 1 * 1000 * 1000;

const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: function (req, file, callback) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return callback(null, true);
    }

    callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
  },
});

export default uploadMiddleware;

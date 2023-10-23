import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/assets/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id + '_' + Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage
});

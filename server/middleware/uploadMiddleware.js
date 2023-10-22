import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/assets/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id);
  },
});

export const upload = multer({
  storage: storage
});

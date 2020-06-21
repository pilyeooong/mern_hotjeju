import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "media/places"); // 저장위치 생성필요
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpeg" || ".png" || ".jpg") {
      return cb(res.status(400).end("only jpg, png, jpeg is allowed"), false);
    }
    cb(null, true);
  },
});

export const uploadPlace = multer({ storage }).array("images"); // 기입한 문자열대로 request륿 받아야함,
                                                                // single = req.file로 path접근, array = files
export const updatePlace = multer({ storage }).none();
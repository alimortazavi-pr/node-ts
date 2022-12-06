import multer from "multer";
import mkdirp from "mkdirp";
import fs from "fs";

const fileDir = () => {
  let year = new Date().getFullYear();
  let correctMonth = new Date().getMonth() + 1;
  let day = new Date().getDate();

  return `./public/uploads/files/${year}/${correctMonth}/${day}`;
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = fileDir();

    mkdirp(dir).then((made) => {
      cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    let filePath = fileDir() + "/" + file.originalname;
    if (!fs.existsSync(filePath)) cb(null, file.originalname);
    else cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadFile = multer({
  storage: fileStorage,
});

export default uploadFile;

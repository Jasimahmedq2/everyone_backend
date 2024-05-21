import multer from "multer";
import multerS3 from "multer-s3";
import s3Client from "./s3client";
import config from "../config";

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: config.aws.bucket_name as string,
    acl: "public-read", // or 'private' if needed
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

export default upload;

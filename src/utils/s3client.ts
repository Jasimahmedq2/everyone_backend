import { S3Client } from "@aws-sdk/client-s3";
import config from "../config";

const s3Client = new S3Client({
  region: config.aws.bucket_origin as string,
  credentials: {
    accessKeyId: config.aws.access_key as string,
    secretAccessKey: config.aws.secret_key as string,
  },
});

export default s3Client;

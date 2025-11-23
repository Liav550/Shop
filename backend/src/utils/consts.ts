const BUCKET_NAME = process.env.BUCKET_NAME;
// prefer explicit BUCKET_REGION, fallback to AWS_REGION
const BUCKET_REGION = process.env.BUCKET_REGION || process.env.AWS_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

if (!BUCKET_REGION) {
  throw new Error(
    "AWS region is missing. Please set BUCKET_REGION or AWS_REGION in your environment or .env file."
  );
}

export { BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SECRET_ACCESS_KEY };

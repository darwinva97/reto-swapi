import dotenv from "dotenv";

dotenv.config();

export const AWS_EXECUTION_ENV = process.env.AWS_EXECUTION_ENV
export const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT
export const AWS_REGION = process.env.AWS_REGION
export const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION
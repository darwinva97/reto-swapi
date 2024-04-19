import {
  AWS_DEFAULT_REGION,
  AWS_EXECUTION_ENV,
  AWS_REGION,
  DYNAMODB_ENDPOINT,
} from "../config";

export const getEndpoint = () => {
  if (AWS_EXECUTION_ENV) {
    return undefined;
  } else if (DYNAMODB_ENDPOINT) {
    return `http://${DYNAMODB_ENDPOINT}`;
  } else {
    return "http://localhost:8000";
  }
};

export const getRegion = () => {
  if (AWS_EXECUTION_ENV) {
    return undefined;
  } else if (AWS_REGION) {
    return AWS_REGION;
  } else if (AWS_DEFAULT_REGION) {
    return AWS_DEFAULT_REGION;
  } else {
    return "local"; // "us-east-1"; //
  }
};

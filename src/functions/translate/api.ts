import { AWS_EXECUTION_ENV } from "../../config";
import { swapiTranslate } from "./controller";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const apiTranslate = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = { statusCode: 200, body: "" };
  const resource = event.pathParameters?.resource || "";
  const id = event.pathParameters?.id || "";

  if (!resource) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "Missing resource parameter",
    });
    return response;
  }

  try {
    const resTranslated = await swapiTranslate(resource, id);
    response.body = JSON.stringify(resTranslated);
  } catch (e: any) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to get person.",
      errorMsg: e?.message || e,
      errorStack: e?.stack || e,
    });
  }

  return response;
};

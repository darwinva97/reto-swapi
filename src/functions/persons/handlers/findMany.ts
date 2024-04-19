import { getAllPersons } from "../controllers";
import { APIGatewayProxyResult } from "aws-lambda";

export const apiGetAllPersons = async (): Promise<APIGatewayProxyResult> => {
  const response = { statusCode: 200, body: "" };

  try {
    const persons = await getAllPersons();

    response.body = JSON.stringify({
      error: null,
      data: persons,
    });
  } catch (e: any) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      error: e?.message,
      data: null,
    });
  }

  return response;
};

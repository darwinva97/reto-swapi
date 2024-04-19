import { deletePerson } from "../controllers";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { personIdSchema } from "../validator";

export const apiDeletePerson = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = { statusCode: 200, body: "" };
  const personId = event?.pathParameters?.personId;

  try {
    // validator schema
    const personIdValidated = personIdSchema.parse(personId);

    // controller
    const deleteResult = await deletePerson(personIdValidated);

    if (deleteResult) {
      response.body = JSON.stringify({
        data: deleteResult,
        error: null,
      });
    } else {
      response.statusCode = 500;
      response.body = JSON.stringify({
        data: null,
        error: "Error deleting person",
      });
    }
  } catch (e: any) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      data: null,
      error: e?.message,
    });
  }

  return response;
};

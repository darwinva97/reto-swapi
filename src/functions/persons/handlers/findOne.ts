import { getPerson } from "../controllers";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { personIdSchema } from "../validator";

export const apiGetPerson = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = { statusCode: 200, body: "" };
  const personId = event?.pathParameters?.personId;

  try {
    // validator schema
    const personIdValidated = personIdSchema.parse(personId);

    // controller
    const person = await getPerson(personIdValidated);

    if (person) {
      response.body = JSON.stringify({
        error: null,
        data: person,
      });
    } else {
      response.statusCode = 404;
      response.body = JSON.stringify({
        error: "Person not found",
        data: null,
      });
    }
  } catch (error: any) {
    console.error(error);
    response.statusCode = 500;
    response.body = JSON.stringify({
      data: null,
      error,
    });
  }

  return response;
};

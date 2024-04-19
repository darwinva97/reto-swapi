import { updatePerson } from "../controllers";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { personIdSchema, updatePersonSchema } from "../validator";

export const apiUpdatePerson = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = { statusCode: 200, body: "" };
  const personId = event?.pathParameters?.personId;
  const person = JSON.parse(event.body || "{}");

  try {
    // validator schema
    const personIdValidated = personIdSchema.parse(personId);
    const personValidated = updatePersonSchema.parse(person);

    // controller
    const updateResult = await updatePerson(personIdValidated, personValidated);

    if (updateResult) {
      response.body = JSON.stringify({
        data: updateResult,
        error: null,
      });
    } else {
      response.statusCode = 500;
      response.body = JSON.stringify({
        data: null,
        error: "Error updating person",
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

import { createPerson } from "../controllers";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createPersonSchema } from "../validator";

export const apiCreatePerson = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = { statusCode: 200, body: "" };
  const person = JSON.parse(event.body || "{}");

  try {
    // validator schema
    const personValidated = createPersonSchema.parse(person);

    // controller
    const createResult = await createPerson(personValidated);

    if (createResult) {
      response.body = JSON.stringify({
        data: createResult,
        error: null,
      });
    } else {
      response.statusCode = 500;
      response.body = JSON.stringify({
        data: null,
        error: "Error creating person",
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

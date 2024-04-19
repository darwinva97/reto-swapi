import { clientDB } from "../../../../clients";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { TDtoUpdatePerson, TIdPerson } from "../../type";

export const updatePerson = async (
  personId: TIdPerson,
  person: TDtoUpdatePerson
): Promise<boolean> => {
  const objKeys = Object.keys(person);
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: marshall({ personId }),
    UpdateExpression: `SET ${objKeys
      .map((_, index) => `#key${index} = :value${index}`)
      .join(", ")}`,
    ExpressionAttributeNames: objKeys.reduce(
      (acc, key, index) => ({
        ...acc,
        [`#key${index}`]: key,
      }),
      {}
    ),
    ExpressionAttributeValues: marshall(
      objKeys.reduce(
        (acc, key, index) => ({
          ...acc,
          [`:value${index}`]: person[key as keyof TDtoUpdatePerson],
        }),
        {}
      )
    ),
  };

  const updateResult = await clientDB.send(new UpdateItemCommand(params));

  return updateResult.$metadata.httpStatusCode === 200;
};

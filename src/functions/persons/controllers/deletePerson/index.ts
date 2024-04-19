import { clientDB } from "../../../../clients";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { TIdPerson } from "../../type";

export const deletePerson = async (personId: TIdPerson): Promise<boolean> => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: marshall({ personId }),
  };
  const deleteResult = await clientDB.send(new DeleteItemCommand(params));

  return deleteResult.$metadata.httpStatusCode === 200;
};

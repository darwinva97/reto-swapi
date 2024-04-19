import { clientDB } from "../../../../clients";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { TPerson, TIdPerson } from "../../type";

export const getPerson = async (
  personId: TIdPerson
): Promise<TPerson | null> => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: marshall({ personId }),
  };
  const { Item } = await clientDB.send(new GetItemCommand(params));

  const result = Item ? (unmarshall(Item) as TPerson) : null;

  return result;
};

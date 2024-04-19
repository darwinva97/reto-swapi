import { clientDB } from "../../../../clients";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { TPerson } from "../../type";

export const getAllPersons = async (): Promise<TPerson[]> => {
  const { Items } = await clientDB.send(
    new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME })
  );
  const result = (Items || []).map((item) => unmarshall(item));

  return result as TPerson[];
};

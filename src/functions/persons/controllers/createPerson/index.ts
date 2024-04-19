import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { clientDB } from "../../../../clients";
import { getAllPersons } from "../getAllPersons";
import { TDtoCreatePerson, TPerson } from "../../type";

export const createPerson = async (
  person: TDtoCreatePerson
): Promise<string | false> => {
  const persons = await getAllPersons();
  const personId = String(persons.length + 89);
  const newPerson: TPerson = {
    ...person,
    personId,
    homeworld: "https://swapi.py4e.com/api/planets/1/",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    url: "",
    created: "",
    edited: "",
  };
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: marshall(newPerson || {}),
  };
  const createResult = await clientDB.send(new PutItemCommand(params));
  return createResult.$metadata.httpStatusCode === 200 ? personId : false;
};

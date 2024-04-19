import { createPerson } from ".";
import { deletePerson } from "../deletePerson";
import { TDtoCreatePerson } from "../../type";
import { generateRandomPersonToCreate } from "../../../../utils";

test("PERSON: CONTROLLER: CREATE", async () => {
  const person: TDtoCreatePerson = generateRandomPersonToCreate();

  const personId = await createPerson(person);

  expect(personId).not.toBe(false);

  if (personId) {
    await deletePerson(personId);
  }
});

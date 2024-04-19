import { faker } from "@faker-js/faker";
import { TDtoCreatePerson } from "../functions/persons/type";

export const randomIntegerBetween = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateRandomPersonToCreate = () => {
  const person: TDtoCreatePerson = {
    name: faker.person.fullName(),
    height: randomIntegerBetween(100, 200).toString(),
    mass: randomIntegerBetween(40, 200).toString(),
    hair_color: faker.color.human(),
    skin_color: faker.color.human(),
    eye_color: faker.color.human(),
    birth_year: "19BBY",
    gender: faker.person.gender(),
  };

  return person;
};

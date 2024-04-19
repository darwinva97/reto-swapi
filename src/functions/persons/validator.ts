import { z } from "zod";

export const personIdSchema = z.string();

export const personSchema = z.object({
  personId: personIdSchema,
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),

  homeworld: z.literal("https://swapi.py4e.com/api/planets/1/"),
  films: z.array(z.undefined()).default([]),
  species: z.array(z.undefined()).default([]),
  vehicles: z.array(z.undefined()).default([]),
  starships: z.array(z.undefined()).default([]),
  url: z.literal(""),
  created: z.literal(""),
  edited: z.literal(""),
});

const basePersonSchema = personSchema.pick({
  name: true,
  height: true,
  mass: true,
  hair_color: true,
  skin_color: true,
  eye_color: true,
  birth_year: true,
  gender: true,
});

export const createPersonSchema = basePersonSchema;

export const updatePersonSchema = basePersonSchema;

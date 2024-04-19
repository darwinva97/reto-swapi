import { z } from "zod";
import {
  createPersonSchema,
  personIdSchema,
  personSchema,
  updatePersonSchema,
} from "./validator";

export type TPerson = z.infer<typeof personSchema>;

export type TDtoCreatePerson = z.infer<typeof createPersonSchema>;

export type TDtoUpdatePerson = z.infer<typeof updatePersonSchema>;

export type TIdPerson = z.infer<typeof personIdSchema>;

export type IdPerson = string;

export interface Person {
  personId: IdPerson;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;

  homeworld: string;
  films: [];
  species: [];
  vehicles: [];
  starships: [];
  url: string;
  created: string;
  edited: string;
}

// Create Person
export interface ResponseCreatePerson {
  error: null;
  data: IdPerson;
}
export interface DtoCreatePerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

// Update Person
export interface DtoUpdatePerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}
export interface ResponseUpdatePerson {
  error: null;
  data: boolean;
}

// Get Persons
export interface ResponsePersons {
  error: null;
  data: Person[];
}

// Get Person
export interface ResponsePerson {
  error: null;
  data: Person;
}
import { translateObject } from "./utils";

export const swapiTranslate = async (
  resource: string,
  id: string
): Promise<{ [x: string]: any }> => {
  const swapiBaseUrl = "https://swapi.dev/api";
  const url = swapiBaseUrl + (id ? `/${resource}/${id}` : `/${resource}`);
  const resSwapi = await fetch(url).then((res) => res.json());
  const resTranslated = await translateObject(resSwapi);

  return resTranslated;
};

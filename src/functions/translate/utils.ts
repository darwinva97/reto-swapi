import { TranslateTextCommand } from "@aws-sdk/client-translate";
import { clientTranslate } from "../../clients";

export const translate = async (Text: string): Promise<string> => {
  const response = await clientTranslate.send(
    new TranslateTextCommand({
      SourceLanguageCode: "en",
      TargetLanguageCode: "es",
      Text,
    })
  );
  const text = response.TranslatedText || Text;
  const finalText = text.replace(/\s/g, "_");
  return finalText;
};

export const translateArray = async (
  array: Array<any>
): Promise<Array<any>> => {
  const newArray: any[] | PromiseLike<any[]> = [];

  await Promise.all(
    array.map(async (item) => {
      if (typeof item === "object") {
        if (item === null) {
          newArray.push(item);
        } else if (Array.isArray(item)) {
          newArray.push(await translateArray(item));
        } else {
          newArray.push(await translateObject(item));
        }
      } else {
        newArray.push(item);
      }
    })
  );

  return newArray;
};

export const translateObject = async (obj: {
  [x: string]: any;
}): Promise<{ [x: string]: any }> => {
  const keys = Object.keys(obj);
  const newObj: { [x: string]: any } = {};

  await Promise.all(
    keys.map(async (key) => {
      const translatedKey = await translate(key);
      if (typeof obj[key] === "object") {
        if (obj[key] === null) {
          newObj[translatedKey] = null;
        } else if (Array.isArray(obj[key])) {
          newObj[translatedKey] = await translateArray(obj[key]);
        } else {
          newObj[translatedKey] = await translateObject(obj[key]);
        }
      } else {
        newObj[translatedKey] = obj[key];
      }
      return null;
    })
  );

  return newObj;
};

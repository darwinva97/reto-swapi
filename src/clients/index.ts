import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { TranslateClient } from "@aws-sdk/client-translate";
import { getEndpoint, getRegion } from "./utils";

const region = getRegion();
const endpoint = getEndpoint();

export const clientDB =
  region && endpoint
    ? new DynamoDBClient({
        region,
        endpoint,
      })
    : new DynamoDBClient({});

export const clientTranslate = region
  ? new TranslateClient({
      region,
    })
  : new TranslateClient({});

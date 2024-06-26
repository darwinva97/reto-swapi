"use strict";

// tests for createPerson
// Generated by serverless-jest-plugin

const handlerCreatePerson = require("./../src/index");
const handlerDeletePerson = require("./../src/index");
const utils = require("./../src/utils/index");

const jestPlugin = require("serverless-jest-plugin");
const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrappedCreatePerson = lambdaWrapper.wrap(handlerCreatePerson, {
  handler: "apiCreatePerson",
});
const wrappedDeletePerson = lambdaWrapper.wrap(handlerDeletePerson, {
  handler: "apiDeletePerson",
});

describe("PERSON: API: CREATE", () => {
  beforeAll((done) => {
    //  lambdaWrapper.init(liveFunction); // Run the deployed lambda

    done();
  });

  let personId;

  it("implement tests here", () => {
    const person = utils.generateRandomPersonToCreate();
    const event = { body: JSON.stringify(person) };

    return wrappedCreatePerson.run(event).then((response) => {
      const body = JSON.parse(response.body);
      personId = body.data;

      expect(response.statusCode).toBe(200);
      expect(body.error).toBeNull();
    });
  });

  afterAll((done) => {
    if (personId) {
      const event = {
        pathParameters: { personId },
      };
      wrappedDeletePerson.run(event);
    }
    done();
  });
});

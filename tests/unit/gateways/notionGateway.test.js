import { Client } from "@notionhq/client";
import NotionGateway from "../../../src/gateways/notionGateway.js";

jest.mock("@notionhq/client", () => {
  return {
    Client: jest.fn()
  }
})

describe("notion gateway", () => {
  it("can be constructed with a token", () => {
    new NotionGateway("somerandomtoken");

    expect(Client).toBeCalledWith({ auth: "somerandomtoken" })
  });
});

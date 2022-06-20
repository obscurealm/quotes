import convertDateTimeToUnixTime from "../../../utils/convertDateTimeToUnixTime";

describe("convertDateTimeToUnixTime util", () => {
  it("converts date time to unix time", () => {
    const unixTime = convertDateTimeToUnixTime("2020-06-24T15:48:00Z");

    expect(unixTime).toBe(1593013680);
  });
});

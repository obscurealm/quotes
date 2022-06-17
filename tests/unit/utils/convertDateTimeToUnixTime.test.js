import convertDateTimeToUnixTime from "../../../utils/convertDateTimeToUnixTime";

describe("convertDateTimeToUnixTime util", () => {
  it("converts date time to unix time", () => {
    const unixTime = convertDateTimeToUnixTime("24 Jun 2020 at 16:48");

    expect(unixTime).toBe(1593013680);
  });
});

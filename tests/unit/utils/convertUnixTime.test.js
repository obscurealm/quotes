import formatUnixTimeToDateTime from "../../../utils/formatUnixTimeToDateTime";

describe("formatUnixTimeToDateTime util", () => {
  it("can return a formatted date", () => {
    const date = formatUnixTimeToDateTime("1593013680");

    expect(date).toBe("24 June 2020");
  });
});

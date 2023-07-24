import convertDateTimeToUtc from "../../../utils/convertDateTimeToUtc";

describe("convertDateTimeToUtc util", () => {
  it("converts London date time to UTC", () => {
    const utcTime = convertDateTimeToUtc(
      "24 Jun 2020 at 16:48",
      "Europe/London",
    );

    expect(utcTime).toBe("2020-06-24T15:48:00Z");
  });

  it("converts Paris date time to UTC", () => {
    const utcTime = convertDateTimeToUtc(
      "24 Jun 2020 at 17:48",
      "Europe/Paris",
    );

    expect(utcTime).toBe("2020-06-24T15:48:00Z");
  });

  it("converts Tokyo date time to UTC", () => {
    const utcTime = convertDateTimeToUtc("25 Jun 2020 at 00:48", "Asia/Tokyo");

    expect(utcTime).toBe("2020-06-24T15:48:00Z");
  });

  it("converts date time to UTC with supplied format", () => {
    const utcTime = convertDateTimeToUtc(
      "24 Jun 2020 16:48",
      "Europe/London",
      "DD MMM YYYY HH:mm",
    );

    expect(utcTime).toBe("2020-06-24T15:48:00Z");
  });

  it("converts date time to UTC with default format", () => {
    const utcTime = convertDateTimeToUtc(
      "24 Jun 2020 at 12:48",
      "Europe/London",
    );

    expect(utcTime).toBe("2020-06-24T11:48:00Z");
  });
});

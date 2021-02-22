import Layout from "../../../src/components/Layout";
import React from "react";
import { render, waitFor } from "@testing-library/react";

jest.mock("next/head", function () {
  return {
    __esModule: true,
    default: (parameters) => {
      const children = parameters.children;
      return <>{children}</>;
    },
  };
});

describe("Layout component", () => {
  it("can display the title", () => {
    const title = "Yusuf";

    render(<Layout title={title} />, {
      container: document.head,
    });

    expect(document.title).toEqual("Yusuf");
  });
});

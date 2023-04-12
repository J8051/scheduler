import React from "react";
import { fireEvent } from "@testing-library/react";
import { render, cleanup } from "@testing-library/react";
import { waitForElement } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  
  it("defaults to Monday and changes the schedule when a new day is selected", () => {render(<Application />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      })
  });

});
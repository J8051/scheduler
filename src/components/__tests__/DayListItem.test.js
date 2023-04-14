import React from "react";
import axios from "axios";
import DayListItem from "components/DayListItem";
import { fireEvent, render, cleanup, waitForElement, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, queryAllByAltText } from "@testing-library/react";
import Application from "components/Application";


afterEach(cleanup);

describe("DayListItem", () => {

  it("renders without crashing", () => {
    render(<DayListItem />);
  });

  it("renders 'no spots remaining' when there are 0 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={0} />);
    expect(getByText("no spots remaining")).toBeInTheDocument();
  });

  it("renders '1 spot remaining' when there is 1 spot", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={1} />);
    expect(getByText("1 spot remaining")).toBeInTheDocument();
  });

  it("renders '2 spots remaining' when there are 2 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={2} />);
    expect(getByText("2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => queryAllByAltText(container, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });



  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    expect(
      getByPlaceholderText(appointment, "Enter Student Name")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  
  });

  it("shows the delete error when failing to delete an existing appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

});



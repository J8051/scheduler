import React from "react";

import { render, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";
import { fireEvent } from "@testing-library/react";
afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });


  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {

    const mockOnSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={mockOnSave} />
    );
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {

    const mockOnSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={mockOnSave} student = "Lydia Miller-Jones"/>
    );
    fireEvent.click(getByText("Save"));

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name and interviewer is defined", () => {
    const mockOnSave = jest.fn();
  const { getByText, queryByText } = render(
    <Form
      interviewers={interviewers}
      onSave={mockOnSave}
      student="Lydia Miller-Jones"
      interviewer={interviewers[0].id}
    />
  );

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });


});
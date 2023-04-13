import React from "react";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {

  const Interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name}
        setInterviewer={() => props.onChange(interviewer.id)}
        selected={props.value === interviewer.id}
      />
    );

  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {Interviewers}
      </ul>
    </section>
  );

}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}; 
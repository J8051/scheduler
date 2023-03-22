import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";



export default function InterviewerListItem(props) { 

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });


  return (
    <li onClick={props.setInterviewer}
      className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>

  ); 

}

//this will be your props later 
// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };
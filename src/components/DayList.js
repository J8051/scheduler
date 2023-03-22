import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) { 

    const DayListItems = props.days.map((day) => {
      return (
        <DayListItem
          key={day.id}
          setDay={props.setDay}
          name={day.name}
          spots={day.spots}
          selected={props.day === day.name} />
      ); 
      
    });
    
  return (
    <ul>
        {DayListItems}
    </ul>
      
    );

}
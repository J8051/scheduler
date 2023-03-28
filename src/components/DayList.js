import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) { 
  
    const DayListItems = props.days.map((day) => {
      return (
        <DayListItem
          key={day.id}
          setDay={props.onChange}
          name={day.name}
          spots={day.spots}
          selected={props.value === day.name} />
      ); 
      
    });
    
  return (
    <ul>
        {DayListItems}
    </ul>
      
    );

}
export function getAppointmentsForDay(state, day) {
  const resultArray = [];
  
  if (state.days.length===0) { 
    return [];
  }

  const filteredDays = state.days.filter(days => days.name === day); 
  if (filteredDays.length === 0) { 
    return [];
  }


  const dayObj = filteredDays.shift();
  console.log("dayObj",dayObj);
  const aptsArrDay = dayObj.appointments;
  console.log("aptsArrDay",aptsArrDay);


  for (const apt of aptsArrDay) {
    for (const key in state.appointments) {
      if (state.appointments[key].id === apt) {
        resultArray.push(state.appointments[key]);
      }
    }
  }
    return resultArray;
}
//xcode-select --install 

// export function getAppointmentsForDay(state, day) {
//   const foundDay = state.days.find(d => d.name === day)

//   if (!foundDay) return []

//   const result = []
//   for (const appointmentId of foundDay.appointments) {
//     result.push(state.appointments[appointmentId])
//   }
//   return result

//   // return foundDay.appointments.map(appointmentId => state.appointments[appointmentId])
// }
const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

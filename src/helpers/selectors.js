export function getAppointmentsForDay(state, day) {
  const resultArray = [];

  if (state.days.length === 0) {
    return [];
  }

  const filteredDays = state.days.filter(days => days.name === day);
  if (filteredDays.length === 0) {
    return [];
  }
  const dayObj = filteredDays.shift();
  const aptsArrDay = dayObj.appointments;

  for (const apt of aptsArrDay) {
    resultArray.push(state.appointments[apt]);
  }

  return resultArray;
}

export function getInterview(state, interview) { 
  if (!interview) { 
    return null;    
  }

  const resultObj = {
    "student": interview.student,
    "interviewer": {
      "id": state.interviewers[interview.interviewer].id,
      "name": state.interviewers[interview.interviewer].name,
      "avatar": state.interviewers[interview.interviewer].avatar
    }
  };

return resultObj
}

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
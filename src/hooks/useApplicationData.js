import React, { useState, useEffect } from "react";
import axios from "axios";

 export default function useApplicationData() {


  const setDay = day => setState({ ...state, day });
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
   
   function updateSpots(state, appointments) {
     const updatedDays = [...state.days];
     const dayObj = updatedDays.find(d => d.name === state.day);
     const index = updatedDays.findIndex(d => d.name === state.day);
     let spots = 0;

     for (const id of dayObj.appointments) {
       const appointment = appointments[id];
       if (appointment.interview === null) {
         spots++;
       }
     }

     const day = { ...dayObj, spots };
     updatedDays[index] = day;
     return updatedDays;
   }
   
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days=updateSpots(state,appointments)
        setState({...state,appointments, days});
      });
  
  }
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, {
      interview,
    })
      .then(() => {
        const days= updateSpots(state,appointments)
        setState({...state,appointments,days});
      });
  }
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

   return {
     state,
     setDay,
     bookInterview,
     cancelInterview
   }
   
 }

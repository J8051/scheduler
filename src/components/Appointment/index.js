import React from 'react';
import Empty from './Empty';
import "./styles.scss";
import Show from './Show';
import Header from './Header';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


export default function Appointment(props) {
  // console.log("PROPS",props);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM"; 
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE)
    props.bookInterview(props.id, interview)
      .then(() => { 
        transition(SHOW); 
      })
      .catch((err) => { 
        console.log(err)
        transition(ERROR_SAVE,true)
      })
  }

  function handleDelete(id) {
    transition(DELETE, true)
    props.cancelInterview(id)
      .then(() => { 
        transition(EMPTY)
      })
      .catch((err) => { 
        console.log(err)
        transition(ERROR_DELETE, true)
      })
   }

  function confirmDelete() { 
    transition(CONFIRM);
  }

  function handleEdit() {
    transition(EDIT); 
   }

  function handleClose() {
    transition(SHOW); 
   } 
  
  
  return (
    <article className="appointment">

      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {
        mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={confirmDelete}
            onEdit={handleEdit}
          />
        )
      }

      {
        mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )
      }
      
      {
        mode === SAVE && (
          <Status
            message="Saving"
          />
        )
      }
            {
        mode === ERROR_SAVE && (
          <Error
            message="error saving please try again"
            onClose={handleClose}
          />
        )
      }
  {
        mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onCancel={back}
            onConfirm={()=> handleDelete(props.id)}
          />
        )
      }
            {
        mode === DELETE && (
          <Status
            message="Deleting"
          />
        )
      }
               {
        mode === ERROR_DELETE && (
          <Error
            message="error deleting please try again"
            onClose={handleClose}
          />
        )
      }


{
        mode === EDIT && (
          <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )
      }

    </article>

  );
    
}

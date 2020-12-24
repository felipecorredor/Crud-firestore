import React, { useEffect, useState } from 'react'
import { firebase } from './firebase'
import { useForm } from "react-hook-form";
import { ArrayList } from './components/ArrayList';
import { Form } from './components/Form'

function App() {

  // REACT-HOOK-FORM TO VALIDATE INPUTS
  const { register, handleSubmit, errors, reset } = useForm();

  // INIT STATES
  const [tasks, setTasks] = useState([])    
  const [edit, setEdit] = useState(false)
  const [field, setField] = useState({})

  // CALL TO API AND GET DATA OF FIRESTORE
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      await db.collection("tareas").get()
      .then(querySnapshot => {      
        const arrayData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
        setTasks(arrayData)             
      })
      .catch(err => {
        console.log('error', err)
      });
    }
    fetchData()
  }, [])

  // ONSUBMIT HOOK FORM
  const onSubmit = (data, e) => edit ? editFirestore(data, field.id, e) : create(data, e)  

  // FUNCTION UPDATE DOCUMENT
  const editFirestore = async (data, id, e) => {    
    const db = firebase.firestore()
    await db.collection("tareas").doc(id).update(data)
    .then(function() {      
      console.log("Document successfully updated!");
      const arrayEditado = tasks.map(item => ( item.id === id ? {id: item.id, ...data} : item ))
      setTasks(arrayEditado)
      createButton()
      e.target.reset();
    })
    .catch(function(error) {
      console.error("Error updating document: ", error);
    });   
  }

  // FUNCTION CREATE DOCUMENT
  const create = async (data, e) => {    
    const db = firebase.firestore()
    await db.collection("tareas").add(data)
      .then(function(docRef) {
        setTasks([ ...tasks, {id: docRef.id, ...data } ])
        e.target.reset();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });        
  }

  // FUNCTION DELETE DOCUMENT
  const deleteFirestore = async id => {
    const db = firebase.firestore()
    db.collection("tareas").doc(id).delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
    const arrayFiltrado = tasks.filter(item => item.id !== id)
    setTasks(arrayFiltrado)
  }

  // PUSH IN STATE TO EDIT O ADD NEW DATA
  const editData = async task => {
    setEdit(true)    
    setField(task) 
  }  

  // PUSH IN SATTE TO KNOW IF EDIT OR CREATE AND CLEAR INPUT
  const createButton = () => {
    setEdit(false)
    setField({ })
  }
  
  return (    
    <div className="container mt-3">      
      <div className="row">      
        <div className="col-md-6">     
          <h3>Your list!</h3>     
          <ul className="list-group">
            <ArrayList tasks={tasks} 
                       deleteFirestore={deleteFirestore} 
                       editData={editData} />
          </ul>
        </div>
        <div className="col-md-6">
        <div className="d-flex">
          <h3 style={{width: '100%'}}>{ edit ? 'Edit Task' : 'Add Task' }</h3>
          <button className="float-rigth btn btn-primary" onClick={createButton}>Create</button>
        </div>        
          <Form reset={reset}
                field={field}
                edit={edit}                
                register={register} 
                handleSubmit={handleSubmit(onSubmit)}
                errors={errors} />
        </div>        
      </div>
    </div>  
  );
}

export default App;

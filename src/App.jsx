import React, { useEffect, useState, Fragment } from 'react'
import { db } from './firebase'
import { useForm } from "react-hook-form";
import { ArrayList } from './components/ArrayList';
import { Form } from './components/Form'
// SACKBAR
import { SnackBar } from './widgest/SnackBar';
// MODAL
import { ModalUI } from './widgest/ModalUI';
// TYPOGRAPHY
import Typography from '@material-ui/core/Typography';

function App() {

  // REACT-HOOK-FORM TO VALIDATE INPUTS
  const { register, handleSubmit, errors, reset } = useForm();

  // INIT STATES
  const [tasks, setTasks] = useState([])    
  const [edit, setEdit] = useState(false)
  const [field, setField] = useState({})

  // SACKBAR
  const [openSnack, setOpenSnack] = useState(false);
  const [messageInfo, setMessageInfo] = useState('');

  // MODAL
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null)
  // CALL TO API AND GET DATA OF FIRESTORE
  useEffect(() => {
    const fetchData = async () => {      
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
    await db.collection("tareas").doc(id).update(data)
    .then(function() {      
      messageSnackBar("updated")      
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
    await db.collection("tareas").add(data)
      .then(function(docRef) {
        messageSnackBar("created")
        setTasks([ ...tasks, {id: docRef.id, ...data } ])
        e.target.reset();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });        
  }

  // FUNCTION DELETE DOCUMENT
  const deleteFirestore = async id => {
    db.collection("tareas").doc(id).delete()
    .then(function() {      
      handleClose()
      messageSnackBar("deleted")      
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

  const handleCloseSnack = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };  
  
  const messageSnackBar = (message) => {
    setMessageInfo(`Document successfully ${message}!`)
    setOpenSnack(true);
  }  

  const handleOpen = (id) => {
    setOpen(true);
    setIdDelete(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (    
    <Fragment>    

      <div className="container mt-3">      
        <div className="row">      
          <div className="col-md-6">     
            <h3>Your list!</h3>     
            {tasks.length === 0 ?
              <Typography variant="h6" component="h2" gutterBottom>
                Without tasks
              </Typography>
            :
            <ul className="list-group">
              <ArrayList tasks={tasks}                          
                         editData={editData} 
                         handleOpen={handleOpen} />
            </ul>
            }
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

      <SnackBar openSnack={openSnack} 
                messageInfo={messageInfo} 
                handleCloseSnack={handleCloseSnack}/>

      <ModalUI idDelete={idDelete}
               handleClose={handleClose} 
               open={open} 
               deleteFirestore={deleteFirestore}  />
      
    </Fragment>

  );
}

export default App;

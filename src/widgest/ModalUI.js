import React from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStyles } from './useStyles'

export const ModalUI = ({handleClose, open, idDelete, deleteFirestore}) => {
  const classes = useStyles();
  return (
    <div>      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Are you sure to delete this task?</h2>            
            <button onClick={() => deleteFirestore(idDelete)} className="btn btn-danger"> Delete </button>
            <button onClick={handleClose} className="btn btn-primary float-right"> Cancel </button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

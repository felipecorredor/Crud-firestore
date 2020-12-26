import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

export const SnackBar = ({openSnack, messageInfo, handleCloseSnack}) => {
  return (    
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={openSnack}
      autoHideDuration={6000}
      onClose={handleCloseSnack}
      message={messageInfo}
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleCloseSnack}>
            UNDO
          </Button>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}

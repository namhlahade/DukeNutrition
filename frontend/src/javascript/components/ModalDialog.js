import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Form from '../pages/signup.component.js';

const ModalDialog = ({ open, handleClose }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      // form to be created
      <Form handleClose={handleClose} />
    </Dialog>
  );
};

export default ModalDialog;

// https://levelup.gitconnected.com/create-a-signup-page-with-react-and-material-ui-9b203d18cf3f
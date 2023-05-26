import React from 'react';

const ErrorDialog = ({ errorMessage, onClose }) => {
  return (
    <div className="error-dialog">
      <div className="error-dialog__content">
        <h4>Error</h4>
        <p>{errorMessage}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorDialog;
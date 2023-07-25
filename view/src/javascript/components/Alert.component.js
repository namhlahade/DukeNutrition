import React from 'react';
import '../../css/alert.css';

export const Alert = ({ message, type }) => {
  return <div id='alertDiv'className={`alert alert-${type}`}>{message}</div>;
};
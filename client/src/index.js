import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './App';
// Needs to be included to provide default styling for react-bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);

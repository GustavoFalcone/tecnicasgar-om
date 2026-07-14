import React from 'react';
import { createRoot } from 'react-dom/client';
import DocumentApp from './document/DocumentApp.jsx';

createRoot(document.getElementById('student-root')).render(
  <React.StrictMode><DocumentApp /></React.StrictMode>
);

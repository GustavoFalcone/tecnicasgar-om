import React from 'react';
import { createRoot } from 'react-dom/client';
import DocumentApp from './document/DocumentApp.jsx';
import VisualReviewApp from './document/editorial/VisualReviewApp.jsx';
import FeaturedShowcaseApp from './document/editorial/FeaturedShowcaseApp.jsx';

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
const App = currentPath === '/area-do-aluno/revisao-visual' ? VisualReviewApp
  : currentPath === '/area-do-aluno/destaques' ? FeaturedShowcaseApp
  : currentPath === '/area-do-aluno/destaques/apresentacao' ? () => <FeaturedShowcaseApp presentation />
  : DocumentApp;

createRoot(document.getElementById('student-root')).render(
  <React.StrictMode><App /></React.StrictMode>
);

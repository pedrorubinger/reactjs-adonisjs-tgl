import React from 'react';

import styles from './App.module.css';
import Router from './routes';
import Footer from './components/Footer';

function App() {
  return (
    <div className={styles.Container}>
        <Router />
        <Footer />
    </div>
  );
}

export default App;
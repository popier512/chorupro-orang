import React, { useState, useEffect } from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement avec setTimeout
    const timer = setTimeout(() => {
      setLoading(false); // Charger la page Home après 3 secondes
      // Rediriger vers la page Home
      
    }, 3000);

    // Nettoyer le timer lorsque le composant est démonté
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      
      {loading ? (
        <div className='orange'>
          <h1 style={{color:'orange'}}>Chargement...</h1>
          
        </div>
      ) : (
        
        (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              
            </Routes>
          </BrowserRouter>
        )
      )}
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f8d7da',
      color: '#721c24',
    },
    title: {
      fontSize: '3rem',
    },
    message: {
      fontSize: '1.5rem',
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Página no encontrada</h1>
      <p style={styles.message}>Lo sentimos, la página que estás buscando no existe.</p>
      <p style={styles.message}>Serás redirigido al home en 5 segundos.</p>
    </div>
  );
};

export default Error;
import AppRoutes from './routes/AppRoutes';
// import { registerSW } from 'virtual:pwa-register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// registerSW({ immediate: true });

const App =()=> {
  return (
    <>
      <ToastContainer 
        position="top-right"  
        autoClose={3000}  
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppRoutes />
    </>
  );
}

export default App;
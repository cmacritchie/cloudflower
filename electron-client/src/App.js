import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Header'

//pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

function App() {
  console.log("Environment Sanity Check, ", process.env.REACT_APP_TEST)
  return (
    <HashRouter >
      <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable={false}
                pauseOnHover
                />
      <Navbar />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />
    </HashRouter>
  );
}

export default App;

import Dashboard from './Pages/Dashboard';
import ClientManager from './Pages/ClientManager';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import Login from './Pages/Login';
import WithoutNav from './Components/Navigation/WithoutNav.';
import WithNav from './Components/Navigation/WithNav';
import { AuthProvider } from './Contexts/AuthContext';
import PrivateRoutes from './Components/PrivateRoutes';
import Chat from './Pages/Chat';

const App = () => {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            <Route element={<WithoutNav/>}>
              <Route path="/login" element={<Login/>}/>
            </Route>
            <Route element = {<PrivateRoutes />} >
              <Route path="/" element={ <WithNav/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/manager" element={<ClientManager/>}/>
                    <Route path="/chat" element={<Chat/>}/>
              </Route>
            </Route>
          </Routes>   
        </AuthProvider>
    </Router>
     
  );
}

export default App;

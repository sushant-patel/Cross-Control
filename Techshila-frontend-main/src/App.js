import { useContext } from 'react';
import './App.css';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import PcList from './components/PcList';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MoreFunctions from './components/MoreFunctions';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<><Navbar/><PcList /></>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="moreinfo/:objectId" element={<><Navbar /><MoreFunctions /> </>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

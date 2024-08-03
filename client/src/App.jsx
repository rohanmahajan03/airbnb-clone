
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from "./pages/IndexPage.jsx"
import LoginPage from './pages/LoginPage.jsx'
import Layout from './Layout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import axios from "axios";
import { UserContextProvider } from './UserContext.jsx';
import { useEffect } from 'react';
import AccountPage from './pages/AccountPage.jsx';
import PlacesPage from './pages/PlacesPage.jsx';
import PlacesFormPage from './pages/PlacesFormPage.jsx';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App

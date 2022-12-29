import  { Routes, Route } from 'react-router-dom'
import Login from './features/auth/Login'
import HomeLayout from './components/HomeLayout'


function App() {
  return (
    <Routes>
      <Route path="/*" element={<HomeLayout />}>
        <Route path="adminLogin" element={<Login />} />   
      </Route>
    </Routes> 
  );
}

export default App;

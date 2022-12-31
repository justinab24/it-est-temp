import  { Routes, Route } from 'react-router-dom'
import Login from './features/auth/Login'
import HomeLayout from './components/HomeLayout'
import AdminBase from './components/AdminBase';
import Admin from './features/admin/Admin'


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="admin" element={<AdminBase />}>
          <Route index element={<Login />}/>
          <Route path="view" element={<Admin />}/>
        </Route>
      </Route>
    </Routes> 
  );
} 

export default App;

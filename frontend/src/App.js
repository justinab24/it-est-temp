import  { Routes, Route } from 'react-router-dom'
import Login from './features/auth/Login'
import HomeLayout from './components/HomeLayout'
import CompsList from './features/admin/CompsList';
import AdminBase from './components/AdminBase';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="admin" element={<AdminBase />}>
          <Route index element={<Login />}/>
          <Route path="components" element={<CompsList />}/>
        </Route>
      </Route>
    </Routes> 
  );
} 

export default App;

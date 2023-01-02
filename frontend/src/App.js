import  { Routes, Route } from 'react-router-dom'
import Login from './features/auth/Login'
import HomeLayout from './components/HomeLayout'
import AdminBase from './components/AdminBase';
import Admin from './components/Admin'
import EditRole from './features/admin/roleStuff/EditRole';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="admin" element={<AdminBase />}>
          <Route index element={<Login />}/>
          <Route path="view">
            <Route index element={<Admin />} />
            <Route path="roles/:id" element={<EditRole />}/>
            {/* <Route path="components/:id" element={<EditComponent />}/> */}
          </Route>
        </Route>
      </Route>
    </Routes> 
  );
} 

export default App;

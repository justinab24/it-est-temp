import { Outlet } from 'react-router-dom'

const AdminBase = () => {
    const content = (
        <div>
            <h1>Admin Panel</h1>
            <br></br>
            <Outlet />
        </div>

    )

    return content
}

export default AdminBase
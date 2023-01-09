import { Outlet } from 'react-router-dom'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'

const AdminBase = () => {
    const content = (
        <>
            <HomeHeader />
            <div className='dash-container'>
                <h1>Admin Panel</h1>
                <br></br>
                <Outlet />
                <br></br>
            </div>
            <HomeFooter />
        </>

    )

    return content
}

export default AdminBase
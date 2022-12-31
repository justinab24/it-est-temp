import CompsList from './CompsList'
import RolesList from './RolesList'
import AddComponent from './AddComponent'
import AddRole from './AddRole'

const Admin = () => {

    const content = (
        <div>
            <h1>Components</h1>
            <CompsList />
            <br></br>
            <h1>Add Component</h1>
            <AddComponent />
            <br></br>
            <h1>Roles</h1>
            <RolesList />
            <br></br>
            <h1>Add Role</h1>
            <AddRole />
        </div>
    )

    return content
}

export default Admin
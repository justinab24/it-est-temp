import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectRoleById } from './rolesApiSlice'
import EditRoleForm from './EditRoleForm'

const EditRole = () => {
    const { id } = useParams()

    const role = useSelector(state => selectRoleById(state, id))

    const content = role ? <EditRoleForm role={role} /> : <p> Loading... </p>

    return content
}

export default EditRole
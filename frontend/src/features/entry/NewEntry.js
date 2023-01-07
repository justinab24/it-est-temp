import { useSelector } from 'react-redux'
import { useGetComponentsQuery} from '../admin/compStuff/compsApiSlice'
import { useGetRolesQuery } from '../admin/roleStuff/rolesApiSlice'
import NewEntryForm from './NewEntryForm'

const NewEntry = () => {

    const {
        data: components
    } = useGetComponentsQuery()

    const {
        data: roles
    } = useGetRolesQuery()

    const content = components && roles ? <NewEntryForm components={components} roles={roles} /> : <p>Loading...</p>

    return content
}

export default NewEntry
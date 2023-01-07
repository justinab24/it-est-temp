import { useSelector } from 'react-redux'
import { selectAllComponents, selectComponentIds, useGetComponentsQuery} from '../admin/compStuff/compsApiSlice'
import { selectAllRoles, useGetRolesQuery } from '../admin/roleStuff/rolesApiSlice'
import NewEntryForm from './NewEntryForm'

const NewEntry = () => {

    const {
        data: components
    } = useGetComponentsQuery()

    const {
        data: roles
    } = useGetRolesQuery()

    // if (components) {
    //     console.log(components)
    //     const ids = components.ids
    //     console.log(ids)
    //     const names = ids.map(id => components.entities[id].name)
    //     console.log(names)
    //     console.log(components.entities['63ad06c7c65e8a69a3eadfc2'].name)
    // }
    
    // const roles = []

    const content = components && roles ? <NewEntryForm components={components} roles={roles} /> : <p>Loading...</p>

    return content
}

export default NewEntry
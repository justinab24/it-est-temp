import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useGetComponentsQuery } from '../admin/compStuff/compsApiSlice'
import { useGetRolesQuery } from '../admin/roleStuff/rolesApiSlice'
import { useSelector } from 'react-redux'
import { selectEntryById } from './entriesApiSlice'

const Entry = ({ entryId }) => {
    const entry = useSelector(state => selectEntryById(state, entryId))
    
    const navigate = useNavigate()

    const {
        data: components,
        isLoading : loadingComps,
        isSuccess : successComps
    } = useGetComponentsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        data: roles,
        isLoading : loadingRoles,
        isSuccess : successRoles
    } = useGetRolesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (loadingComps || loadingRoles) {
        content = <p>Loading Data...</p>
    }

    if (successComps && successRoles) {

        if(entry) {

            const handleEdit = () => navigate(`entries/${entryId}`)
    
            content =  (
                <tr className='table__row component'>
                    <td className={'tableCell'}>{components.entities[entry.comp].name}</td>
                    <td className={'tableCell'}>{entry.description}</td>
                    <td className={'tableCell'}>{entry.complexity}</td>
                    <td className={'tableCell'}>{entry.count}</td>
                    <td className={'tableCell'}>{roles.entities[entry.role].name}</td>
                    <td className={'tableCell'}>{entry.total.$numberDecimal}</td>
                    <td className={'tableCell'}>{entry.totalTime}</td>
                    <td className={'tableCell'}>
                        <button     
                            className='icon-button table__button'
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </td>
                </tr>
            )
        } else {
            console.log('Fail')
            content = null
        }
    }

    return content

}

export default Entry
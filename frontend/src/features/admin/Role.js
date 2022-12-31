import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectRoleById } from './rolesApiSlice'

const Role = ({ roleId }) => {
    const role = useSelector(state => selectRoleById(state, roleId))

    const navigate = useNavigate()

    if(role) {

        const handleEdit = () => navigate(`/admin/roles/${roleId}`)

        return (
            <tr className="table__row role">
                <td className={"table__cell"}>{role.name}</td>
                <td className={"table__cell"}>{role.rate.$numberDecimal}</td>
                <td className={"table__cell"}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else {
        console.log('Fail')
        return null
    }
}

export default Role
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectRoleById } from './rolesApiSlice'

const Role = ({ roleId }) => {
    const role = useSelector(state => selectRoleById(state, roleId))

    const navigate = useNavigate()

    if(role) {

        const handleEdit = () => navigate(`/admin/view/roles/${roleId}`)

        return (
            <tr className="table__row role">
                <td className={"tableCell"}>{role.name}</td>
                <td className={"tableCell"}>{role.rate.$numberDecimal}</td>
                <td className={"tableCell"}>
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
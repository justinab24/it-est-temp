import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectCompById } from './compsApiSlice'

const Component = ({ componentId }) => {
    const component = useSelector(state => selectCompById(state, componentId))

    const navigate = useNavigate()

    if(component) {

        const handleEdit = () => navigate(`/admin/components/${componentId}`)

        return (
            <tr className="table__row component">
                <td className={"table__cell"}>{component.name}</td>
                <td className={"table__cell"}>{component.rate.$numberDecimal}</td>
                <td className={"table__cell"}>{component.lowval}</td>
                <td className={"table__cel "}>{component.medval}</td>
                <td className={"table__cell"}>{component.highval}</td>
                <td className={"table__cell"}>{component.vhighval}</td>
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

export default Component
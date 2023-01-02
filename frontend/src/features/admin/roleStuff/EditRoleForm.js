import { useState, useEffect } from "react"
import { useUpdateRoleMutation, useDeleteRoleMutation } from "./rolesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const NAME_REGEX = /^[A-z0-9]{3,20}$/
const RATE_REGEX = /^\d+\.\d{0,2}$/

const EditRoleForm = ({ role }) => {

    const [updateRole, {
        isLoading,
        isSuccess
    }] = useUpdateRoleMutation()

    const [deleteRole, {
        isSuccess: isDelSuccess
    }] = useDeleteRoleMutation()

    const navigate = useNavigate()

    // console.log(role.name)
    // console.log(role.rate.$numberDecimal)

    const [name, setName] = useState(role.name)
    const [validName, setValidName] = useState(false)
    const [rate, setRate] = useState(role.rate)
    const [validRate, setValidRate] = useState(false)

    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        setValidRate(RATE_REGEX.test(rate))
    }, [rate])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setName('')
            setRate('')
            navigate('/admin/view')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onRateChanged = e => setRate(e.target.value)

    const onSaveRoleClicked = async () => {
        await updateRole({id: role.id, name, rate})
    }

    const onDeleteRoleClicked = async () => {
        await deleteRole({id: role.id})
    }

    const canSave = [validName, validRate].every(Boolean) && !isLoading

    console.log(canSave)

    // console.log(validName)
    // console.log(validRate)

    // console.log(canSave)

    const content = (
        <div>
            <form id="editRoleForm" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Role Form</h2>
                    <br></br>
                    <br></br>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveRoleClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteRoleClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                    </div>
                </div>
                <label for="name">New Role Name: </label>
                <input 
                    type="text" 
                    value={name} 
                    name="name"
                    onChange={onNameChanged}
                />
                <br></br>
                <br></br>
                <label for="rate">New Rate Value: </label>
                <input 
                    type="number" 
                    value={rate.$numberDecimal} 
                    step="0.01" 
                    name="rate"
                    onChange={onRateChanged}
                />
            </form>
        </div>
    )

    return content

}

export default EditRoleForm
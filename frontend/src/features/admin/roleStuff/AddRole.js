import { useState, useEffect } from 'react'
import { useAddNewRoleMutation } from './rolesApiSlice'
import { useNavigate } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSave } from '@fortawesome/free-solid-svg-icons'

const NAME_REGEX = /^[A-z0-9]{3,20}$/
const RATE_REGEX = /^\d+\.\d{0,2}$/

const AddRole = () => {


    const [addNewRole, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewRoleMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [rate, setRate] = useState('')
    const [validRate, setValidRate] = useState(false)

    console.log(name)
    console.log(rate)

    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        setValidRate(RATE_REGEX.test(rate))
    }, [rate])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setRate('')
            navigate('/admin/view')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onRateChanged = e => setRate(e.target.value)

    const canSave = [validName, validRate].every(Boolean) && !isLoading

    const onSaveRoleClicked = async (e) => {
        if(canSave) {
            e.preventDefault()
            await addNewRole({name, rate})
        }
    }

    const content =  (
        <div>
            <form id="addRoleForm" onSubmit={onSaveRoleClicked}>
                <table style={{width:"100%"}} id="addRoleTable">
                    <tbody>
                        <td>
                            <input 
                                style={{width:"100%"}} 
                                type="text" 
                                name="name" 
                                required
                                onChange={onNameChanged}
                            />
                        </td>
                        <td>
                            <input 
                                style={{width:"100%"}} 
                                type="number" step="0.01" 
                                name="rate" 
                                required
                                onChange={onRateChanged}
                            />
                        </td>
                        <td>
                            <input style={{width:"100%"}} type="submit" value="Submit"/>
                        </td>
                    </tbody>
                </table>
            </form>
        </div>
    )

    return content
}

export default AddRole
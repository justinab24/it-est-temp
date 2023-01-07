import { useState, useEffect } from "react"
import { useUpdateComponentMutation, useDeleteComponentMutation } from "./compsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const NAME_REGEX = /^[A-z0-9]{3,20}$/

const EditComponentForm = ({ component }) => {

    const [updateComponent, {
        isLoading,
        isSuccess
    }] = useUpdateComponentMutation()

    const [deleteComponent, {
        isSuccess: isDelSuccess
    }] = useDeleteComponentMutation()

    const navigate = useNavigate()

    // console.log(role.name)
    // console.log(role.rate.$numberDecimal)

    const [name, setName] = useState(component.name)
    const [validName, setValidName] = useState(false)
    const [rate, setRate] = useState(component.rate)
    const [lowval, setLow] = useState(component.lowval)
    const [medval, setMed] = useState(component.medval)
    const [highval, setHigh] = useState(component.highval)
    const [vhighval, setVHigh] = useState(component.vhighval)

    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setName('')
            navigate('/admin/view')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onRateChanged = e => setRate(e.target.value)
    const onLowChanged = e => setLow(e.target.value)
    const onMedChanged = e => setMed(e.target.value)
    const onHighChanged = e => setHigh(e.target.value)
    const onVHighChanged = e => setVHigh(e.target.value)

    const onSaveComponentClicked = async () => {
        await updateComponent({id: component.id, name, rate, lowval, medval, highval, vhighval})
    }

    const onDeleteComponentClicked = async () => {
        await deleteComponent({id: component.id})
    }

    const canSave = [validName].every(Boolean) && !isLoading

    console.log(canSave)

    // console.log(validName)
    // console.log(validRate)

    // console.log(canSave)

    const content = (
        <div>
            <form id="editComponentForm" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Component Form</h2>
                    <br></br>
                    <br></br>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveComponentClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteComponentClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                    </div>
                </div>
                <label for="name">New Component Name: </label>
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
                <br></br>
                <br></br>
                <label for="lowval">New Low Complexity: </label>
                <input 
                    type="number" 
                    name="lowval"
                    onChange={onLowChanged}
                />
                <br></br>
                <br></br>
                <label for="medval">New Medium Complexity: </label>
                <input 
                    type="number" 
                    name="medval"
                    onChange={onMedChanged}
                />
                <br></br>
                <br></br>
                <label for="highval">New High Complexity: </label>
                <input 
                    type="number" 
                    name="highval"
                    onChange={onHighChanged}
                />
                <br></br>
                <br></br>
                <label for="name">New Very High Complexity: </label>
                <input 
                    type="number" 
                    name="vhighval"
                    onChange={onVHighChanged}
                />
                <br></br>
                <br></br>
            </form>
        </div>
    )

    return content

}

export default EditComponentForm
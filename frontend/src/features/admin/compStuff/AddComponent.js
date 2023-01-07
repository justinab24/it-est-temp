import { useState, useEffect } from 'react'
import { useAddNewComponentMutation } from './compsApiSlice'
import { useNavigate } from 'react-router-dom'

const NAME_REGEX = /^[A-z0-9]{3,20}$/


const AddComponent = () => {

    const [addNewComponent, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewComponentMutation()

    const navigate = useNavigate()

    const[name, setName] = useState('')
    const[validName, setValidName] = useState(false)
    const [rate, setRate] = useState('')
    const [lowval, setLow] = useState('')
    const [medval, setMed] = useState('')
    const [highval, setHigh] = useState('')
    const [vhighval, setVHigh] = useState('')

    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        if (isSuccess) {
            setName('')
            navigate('/admin/view')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onRateChanged = e => setRate(e.target.value)
    const onLowChanged = e => setLow(e.target.value)
    const onMedChanged = e => setMed(e.target.value)
    const onHighChanged = e => setHigh(e.target.value)
    const onVHighChanged = e => setVHigh(e.target.value)

    const canSave = [validName].every(Boolean) && !isLoading

    console.log(canSave + " can save")

    const onSaveComponentClicked = async (e) => {
        if(canSave) {
            e.preventDefault()
            await addNewComponent({name, rate, lowval, medval, highval, vhighval})
        }
    }



    const content = (
        <div>
            <form id="addCompForm" onSubmit={onSaveComponentClicked}>
                <table style={{width:"100%"}} id="addCompTable">
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
                                type="number" 
                                step="0.01" 
                                name="rate" 
                                required
                                onChange={onRateChanged}
                            />
                        </td>
                        <td>
                            <input 
                                style={{width:"100%"}} 
                                type="number" 
                                name="lowval" 
                                required
                                onChange={onLowChanged}
                            />
                        </td>
                        <td>
                            <input 
                                style={{width:"100%"}} 
                                type="number" 
                                name="medval" 
                                required
                                onChange={onMedChanged}
                            />
                        </td>
                        <td>
                            <input 
                                style={{width:"100%"}} 
                                type="number" 
                                name="highval" 
                                required
                                onChange={onHighChanged}
                            />
                        </td>
                        <td>
                            <input 
                                style={{width:"100%"}} 
                                type="number" 
                                name="vhighval" 
                                required
                                onChange={onVHighChanged}
                            />
                        </td>
                        <td>
                            <input style={{width:"100%"}} type="submit" value="Submit" required/>
                        </td>
                    </tbody>
                </table>
            </form>
        </div>
    )

    return content
}

export default AddComponent
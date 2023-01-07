import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewEntryMutation } from "./entriesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewEntryForm = ({ components, roles}) => {

    const componentIds = components.ids

    const roleIds = roles.ids

    const complexities = ['low', 'medium', 'high', 'very high']

    
    const [addNewEntry, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewEntryMutation()

    const navigate = useNavigate()

    const [componentId, setComponentId] = useState(componentIds[0])
    const [description, setDescription] = useState('')
    const [complexity, setComplexity] = useState(complexities[0])
    const [count, setCount] = useState('')
    const [roleId, setRoleId] = useState(roleIds[0])


    useEffect(() => {
        if (isSuccess) {
            setComponentId('')
            setDescription('')
            setComplexity('')
            setCount('')
            setRoleId('')
            navigate('')
        }
    }, [isSuccess, navigate])

    const onComponentIdChanged = e => setComponentId(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onComplexityChanged = e => setComplexity(e.target.value)
    const onCountChanged = e => setCount(e.target.value)
    const onRoleIdChanged = e => setRoleId(e.target.value)

    const canSave = [componentId, description, complexity, count, roleId].every(Boolean) && !isLoading

    const onSaveEntryClicked = async (e) => {
        const rate = roles.entities[roleId].rate.$numberDecimal
        const component = components.entities[componentId]
        const compRate = components.entities[componentId].rate.$numberDecimal
        let compComplexity
        if (complexity === "low") {
            compComplexity = component.lowval
        } else if (complexity === "medium") {
            compComplexity = component.medval
        } else if (complexity === "high") {
            compComplexity = component.highval
        } else {
            compComplexity = component.vhighval
        }
        const total = (compRate * compComplexity * count) + (rate * compComplexity * count)
        console.log(total)
        e.preventDefault()
        if (canSave) {
            await addNewEntry({ comp: componentId, description, complexity, count, role: roleId, total})
        }
    }

    const componentOptions = componentIds.map(componentId => {
        return (
            <option
                key={componentId}
                value={componentId}
            > {components.entities[componentId].name}</option >
        )
    })

    const roleOptions = roleIds.map(roleId => {
        return (
            <option
                key={roleId}
                value={roleId}
            >{roles.entities[roleId].name}</option>
        )
    })


    const complexityOptions = complexities.map(complexity => {
        return (
            <option
                key={complexities.indexOf(complexity)}
                value={complexity}
            >{complexity}</option>
        )
    })

    // const errClass = isError ? "errmsg" : "offscreen"
    // const validTitleClass = !title ? "form__input--incomplete" : ''
    // const validTextClass = !text ? "form__input--incomplete" : ''

    const content = (
        <div>
            {/* <p className={errClass}>{error?.data?.message}</p> */}

            <form className="form" onSubmit={onSaveEntryClicked}>
                <div className="form__title-row">
                    <h2>New Entry</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="component">
                    Component:</label>
                <select
                    id="component"
                    name="component"
                    value={componentId}
                    onChange={onComponentIdChanged}
                >
                    {componentOptions}
                </select>

                <label className="form__label" htmlFor="description">
                    Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <label htmlFor="complexity">
                    Complexity:</label>
                <select
                    id="complexity"
                    name="complexity"
                    value={complexity}
                    onChange={onComplexityChanged}
                >
                    {complexityOptions}
                </select>

                <label className="form__label" htmlFor="count">
                    Count:</label>

                <input
                    id="count"
                    name="count"
                    type="number"
                    onChange={onCountChanged}
                ></input>

                <label className="form__label" htmlFor="role">
                    Role:</label>
                <select
                    id="role"
                    name="role"
                    value={roleId}
                    onChange={onRoleIdChanged}
                >
                    {roleOptions}
                </select>
            </form>
        </div>
    )

    return content
}

export default NewEntryForm
import { useState, useEffect } from "react"
import { useUpdateEntryMutation, useDeleteEntryMutation } from "./entriesApiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useGetComponentsQuery } from "../admin/compStuff/compsApiSlice"
import { useGetRolesQuery } from "../admin/roleStuff/rolesApiSlice"


const EditEntryForm = ({entry}) => {

    const {
        data: comps,
    } = useGetComponentsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        data: roles,
    } = useGetRolesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
   
    const [updateEntry, {
        isLoading,
        isSuccess,
    }] = useUpdateEntryMutation()

    const [deleteEntry, {
        isSuccess: isDelSuccess,
    }] = useDeleteEntryMutation()

    const navigate = useNavigate()

    const [componentId, setComponentId] = useState(entry.comp)
    const [description, setDescription] = useState(entry.description)
    const [complexity, setComplexity] = useState(entry.complexity)
    const [count, setCount] = useState(entry.count)
    const [roleId, setRoleId] = useState(entry.role)

    useEffect(() => {
        console.log(isDelSuccess || isSuccess)
        if(isSuccess || isDelSuccess) {
            setComponentId('')
            setDescription('')
            setComplexity('')
            setCount('')
            setRoleId('')
            navigate('')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onComponentIdChanged = e => setComponentId(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onComplexityChanged = e => setComplexity(e.target.value)
    const onCountChanged = e => setCount(e.target.value)
    const onRoleIdChanged = e => setRoleId(e.target.value)

    const onSaveEntryClicked = async () => {
        const rate = roles.entities[roleId].rate.$numberDecimal
        const component = comps.entities[componentId]
        const compRate = comps.entities[componentId].rate.$numberDecimal
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
        await updateEntry({comp: componentId, description, complexity, count, role: roleId, total})
    }

    const onDeleteEntryClicked = async () => {
        console.log(entry.id)
        await deleteEntry({id: entry.id})
    }

    const canSave = [componentId, description, complexity, count, roleId].every(Boolean) && !isLoading

    const roleIds = roles.ids

    const componentIds = comps.ids
    
    const complexities = ['low', 'medium', 'high', 'very high']

    const componentOptions = componentIds.map(componentId => {
        return (
            <option
                key={componentId}
                value={componentId}
            > {comps.entities[componentId].name}</option >
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


    const content = (
            <div>
                <form className="form" onSubmit={onSaveEntryClicked}>
                <div className="form__title-row">
                    <h2>Edit Entry Form</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteEntryClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
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

export default EditEntryForm

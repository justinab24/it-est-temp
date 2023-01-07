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
        isLoading: compsLoading,
        isSuccess: compsSuccess
    } = useGetComponentsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        data: roles,
        isLoading: rolesLoading,
        isSuccess: rolesSuccess
    } = useGetRolesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (compsLoading || rolesLoading) {
        content = <p>Loading Information...</p>
    }

    console.log(compsSuccess && rolesSuccess)
    
   
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
        console.log(isSuccess)
        if(isSuccess || isDelSuccess) {
            navigate('')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onComponentIdChanged = e => setComponentId(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onComplexityChanged = e => setComplexity(e.target.value)
    const onCountChanged = e => setCount(e.target.value)
    const onRoleIdChanged = e => setRoleId(e.target.value)

    const onSaveEntryClicked = async () => {
        await updateEntry({comp: componentId, description, complexity, count, role: roleId,})
    }

    const onDeleteEntryClicked = async () => {
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


    content = (
     <h1>Hello Worlldddd</h1>
    )
    

    return content

}

export default EditEntryForm

//  <div>
// //     {/* <p className={errClass}>{error?.data?.message}</p> */}

// //     <form className="form" onSubmit={onSaveEntryClicked}>
// //         <div className="form__title-row">
// //             <h2>Edit Entry Form</h2>
// //             <div className="form__action-buttons">
// //                 <button
//                     className="icon-button"
//                     title="Save"
//                     disabled={!canSave}
//                 >
//                     <FontAwesomeIcon icon={faSave} />
//                 </button>
//                 <button
//                     className="icon-button"
//                     title="Delete"
//                     onClick={onDeleteEntryClicked}
//                 >
//                     <FontAwesomeIcon icon={faTrashCan}/>
//                 </button>
//             </div>
//         </div>
//         <label className="form__label" htmlFor="component">
//             Component:</label>
//         <select
//             id="component"
//             name="component"
//             value={componentId}
//             onChange={onComponentIdChanged}
//         >
//             {componentOptions}
//         </select>

//         <label className="form__label" htmlFor="description">
//             Description:</label>
//         <textarea
//             id="description"
//             name="description"
//             value={description}
//             onChange={onDescriptionChanged}
//         />

//         <label htmlFor="complexity">
//             Complexity:</label>
//         <select
//             id="complexity"
//             name="complexity"
//             value={complexity}
//             onChange={onComplexityChanged}
//         >
//             {complexityOptions}
//         </select>

//         <label className="form__label" htmlFor="count">
//             Count:</label>

//         <input
//             id="count"
//             name="count"
//             type="number"
//             onChange={onCountChanged}
//         ></input>

//         <label className="form__label" htmlFor="role">
//             Role:</label>
//         <select
//             id="role"
//             name="role"
//             value={roleId}
//             onChange={onRoleIdChanged}
//         >
//             {roleOptions}
//         </select>
//     </form>
// </div>
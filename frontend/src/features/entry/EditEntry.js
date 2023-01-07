import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEntryById } from './entriesApiSlice'
import EditEntryForm from './EditEntryForm'

const EditEntry = () => {
    const { id } = useParams()

    const entry = useSelector(state => selectEntryById(state, id))

    const content = entry ? <EditEntryForm entry={entry} /> : <p>Loading...</p>

    return content
}

export default EditEntry
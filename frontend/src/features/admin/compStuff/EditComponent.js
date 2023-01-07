import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectComponentById } from './compsApiSlice'
import EditComponentForm from './EditComponentForm'

const EditComponent = () => {
    const { id } = useParams()

    const component = useSelector(state => selectComponentById(state, id))

    const content = component ? <EditComponentForm component={component} /> : <p> Loading... </p>

    return content
}

export default EditComponent
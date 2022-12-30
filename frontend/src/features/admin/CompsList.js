import { useGetComponentsQuery } from "./compsApiSlice"
import  Component  from './Admin'

const CompsList = () => {

    const {
        data: comps,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetComponentsQuery()

    let content

    if(isLoading) {
        content = <p>Loading...</p>
    }


    if(isError) {
        content = <p className="errormsg">{error?.data?.message}</p>
    }

    if(isSuccess) {

        const { ids } = comps

        const tableContent = ids?.length
             ? ids.map(componentId => <Component key={componentId} componentId={componentId} />)
             : null

        content = ( 
            <table className="table table--components">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th comp__name">Name</th>
                        <th scope="col" className="table__th comp__rate">Rate</th>
                        <th scope="col" className="table__th comp__lowval">Low</th>
                        <th scope="col" className="table__th comp__medval">Medium</th>
                        <th scope="col" className="table__th comp__highval">High</th>
                        <th scope="col" className="table__th comp__vhighval">Very High</th>
                        <th scope="col" className="table__th comp__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content

}

export default CompsList
import { useGetComponentsQuery } from "./compsApiSlice"
import  Component  from './Component'

const CompsList = () => {

    const {
        data: comps,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetComponentsQuery(undefined , {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    console.log(comps)

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
            <table style={{width:"100%"}} className="table table--components">
                <thead className="table__thead">
                    <tr>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__name">Name</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__rate">Rate</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__lowval">Low</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__medval">Medium</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__highval">High</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__vhighval">Very High</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__edit">Edit</th>
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
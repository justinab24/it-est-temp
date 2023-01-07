import { useGetEntriesQuery } from "./entriesApiSlice";
import Entry from './Entry'

const EntryList = () => {
    
    const {
        data: entries,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEntriesQuery()

    let content

    if(isLoading) {
        content = <p>Loading...</p>
    }

    if (isError) {
        content = <p className="errormsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        
        const { ids } = entries

        const tableContent = ids?.length
            ? ids.map(entryId => <Entry key={entryId} entryId={entryId} />)
            : null

        content = (
            <table style={{width:"100%"}} className="table table--components">
                <thead className="table__thead">
                    <tr>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__name">Component</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__rate">Description</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__lowval">Complexity</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__medval">Count</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__highval">Role</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__highval">Total Cost</th>
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

export default EntryList
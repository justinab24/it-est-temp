import { useGetRolesQuery } from "./rolesApiSlice"
import  Role  from './Role'

const RolesList = () => {

    const {
        data: roles,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRolesQuery()

    let content

    if(isLoading) {
        content = <p>Loading...</p>
    }


    if(isError) {
        content = <p className="errormsg">{error?.data?.message}</p>
    }

    if(isSuccess) {

        const { ids } = roles

        const tableContent = ids?.length
             ? ids.map(roleId => <Role key={roleId} roleId={roleId} />)
             : null

        content = ( 
            <table style={{width:"100%"}} className="table table--components">
                <thead className="table__thead">
                    <tr>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__name">Name</th>
                        <th style={{width:"10%"}} scope="col" className="table__th comp__rate">Rate</th>
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

export default RolesList
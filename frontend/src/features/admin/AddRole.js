const AddRole = () => {
    const content = (
        <div>
            <form id="addRoleForm" action="" method="post">
                <table id="addRoleTable">
                    <tbody>
                        <td>
                            <input type="text" name="roleName" required/>
                        </td>
                        <td>
                            <input type="number" step="0.01" name="roleRate" required/>
                        </td>
                        <td>
                            <input type="submit" value="Submit"/>
                        </td>
                    </tbody>
                </table>
            </form>
        </div>
    )

    return content
}

export default AddRole
const AddComponent = () => {
    const content = (
        <div>
            <form id="addCompForm" action="" method="post">
                <table style={{width:"100%"}} id="addCompTable">
                    <tbody>
                        <td>
                            <input style={{width:"100%"}} type="text" name="compName" required/>
                        </td>
                        <td>
                            <input style={{width:"100%"}} type="number" step="0.01" name="compRate" required/>
                        </td>
                        <td>
                            <input style={{width:"100%"}} type="number" name="lowval" required/>
                        </td>
                        <td>
                            <input style={{width:"100%"}} type="number" name="medval" required/>
                        </td>
                        <td>
                            <input style={{width:"100%"}} type="number" name="highval" required/>
                        </td>
                        <td>
                            <input style={{width:"100%"}} type="number" name="vhighval" required/>
                        </td>
                        <td>
                            <input style={{width:"100%"}} type="submit" value="Submit" required/>
                        </td>
                    </tbody>
                </table>
            </form>
        </div>
    )

    return content
}

export default AddComponent
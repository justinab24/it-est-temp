const AddComponent = () => {
    const content = (
        <div>
            <form id="addCompForm" action="" method="post">
                <table id="addCompTable">
                    <tbody>
                        <td>
                            <input type="text" name="compName" required/>
                        </td>
                        <td>
                            <input type="number" step="0.01" name="compRate" required/>
                        </td>
                        <td>
                            <input type="number" name="lowval" required/>
                        </td>
                        <td>
                            <input type="number" name="medval" required/>
                        </td>
                        <td>
                            <input type="number" name="highval" required/>
                        </td>
                        <td>
                            <input type="number" name="vhighval" required/>
                        </td>
                        <td>
                            <input type="submit" value="Submit" required/>
                        </td>
                    </tbody>
                </table>
            </form>
        </div>
    )

    return content
}

export default AddComponent
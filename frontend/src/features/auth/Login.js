import React from 'react'

const Login = () => {
  return (
    <div>
      <form id="adminAuth" action="" method="post">
          <label for="adminName">Username: </label>
          <input type="text" name="adminName" required/>
          <br/>
          <br/>
          <br/>
          <label for="adminPwd">Password: </label>
          <input type="text" name='adminPwd' required/>
          <br/>
          <br/>
          <input type="submit" value="Submit"/>
      </form>
   </div>
  )
}

export default Login

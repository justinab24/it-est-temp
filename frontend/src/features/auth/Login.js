import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  let error

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const onUnameChanged = e => setUsername(e.target.value)
  const onPassChanged = e => setPassword(e.target.value)

  const onLoginClicked = async () => {
    console.log(username)
    console.log(password)
    if (username === process.env.REACT_APP_ADMIN_USER && password === process.env.REACT_APP_ADMIN_PASS) {
      error = false
    } else {
      error = true
    }

    if (!error) {
      navigate('/admin/view')
    } else {
      navigate('/admin')
    }


  }

  return (
      <div>
        <form id="adminAuth" onSubmit={onLoginClicked}>
            <label for="adminName">Username: </label>
            <input type="text" name="adminName" onChange={onUnameChanged} required/>
            <br/>
            <br/>
            <br/>
            <label for="adminPwd">Password: </label>
            <input type="text" name='adminPwd' onChange={onPassChanged} required/>
            <br/>
            <br/>
            <input type="submit" value="Submit"/>
        </form>

        {error ? <h1>Invalid credentials</h1> : null}
    </div>
  )
}

export default Login

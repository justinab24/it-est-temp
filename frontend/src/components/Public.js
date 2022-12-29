import { Link } from 'react-router-dom'

import React from 'react'

const Public = () => {
  const content = (
    <section className="public">
        <header>
            <h1><span className="nowrap">I.T Estimation Template</span></h1>
        </header>
        <main className='public_main'>
            <p>Input components, complexity values, and assign roles to them and get an estimation of your project cost!</p>
        </main>
        <footer>
            <Link to="adminLogin">Admin Login</Link>
            <br></br>
            <Link to="">User Panel</Link>
        </footer>
    </section>
  )

  return content

}

export default Public

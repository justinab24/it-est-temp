import React from 'react'
import { Link } from 'react-router-dom'

const HomeHeader = () => {
  
    const content = (
        <header className='dash-header'>
            <div className='dash-header__container'>
                <Link to="/dash/admin">
                    <h1 className='dash-header__title'>I.T Estimation Template</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/**/}
                </nav>
            </div>
        </header>
    )
    
    return content

}

export default HomeHeader

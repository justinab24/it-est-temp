import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const HomeFooter = () => {
    
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null

    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer className='dash-footer'>
            {goHomeButton}
            <Link to="adminLogin">Admin Login</Link>
        </footer>
    )  

  return content
}

export default HomeFooter

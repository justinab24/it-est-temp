import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const HomeFooter = () => {
    
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/')


    let goHomeButton = null
    let adminLink = null

    if (pathname !== '/') {
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
    if (pathname !== '/admin') {
        if (pathname == '/admin/view') {
            adminLink = (
                <Link to="">Admin Login</Link>
            )
        } else {
            adminLink = (
                <Link to="admin">Admin Login</Link>
            )

        }
    }

    const content = (
        <footer className='dash-footer'>
            {goHomeButton}
            {adminLink}
        </footer>
    )  

  return content
}

export default HomeFooter

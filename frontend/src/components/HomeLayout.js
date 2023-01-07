import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'
import NewEntry from '../features/entry/NewEntry'
import EntryList from '../features/entry/EntryList'

const HomeLayout = () => {
  return (
    <>
        <HomeHeader />
        <div className="dash-container">
          <h2>Add your components below!</h2>
          <br></br>
          <NewEntry />
          <br></br>
          <EntryList />
          <Outlet />
        </div>
        <HomeFooter />
    </>
  )
}

export default HomeLayout

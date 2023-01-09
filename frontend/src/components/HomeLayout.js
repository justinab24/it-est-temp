import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'
import NewEntry from '../features/entry/NewEntry'
import EntryList from '../features/entry/EntryList'
import EntryTotal from '../features/entry/EntryTotal'

const HomeLayout = () => {
  return (
    <>
        <HomeHeader />
        <div className="dash-container">
          <h2>Add your components below!</h2>
          <br></br>
          <div className="formatEntryAndTotal">
            <NewEntry />
            <EntryTotal />
          </div>  
          <br></br>
          <EntryList />
          <Outlet />
        </div>
        <HomeFooter />
    </>
  )
}

export default HomeLayout

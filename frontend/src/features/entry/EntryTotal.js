import React from 'react'
import { useGetEntriesQuery } from './entriesApiSlice'

const EntryTotal = () => {

    let totalCost = 0
    let totalHours = 0

    const {
        data: entries
    } = useGetEntriesQuery()


    if (entries) {
        const entryIds = entries.ids
        if (entryIds.length < 1) {
            totalCost = 0
            totalHours = 0
        } else {
            for (let i = 0; i < entryIds.length; i++) {
                totalCost += parseFloat(entries.entities[entryIds[i]].total.$numberDecimal).toFixed(2)
                totalHours += entries.entities[entryIds[i]].totalTime
            }
        }
    } 
    
    return (
        <div>
            <h1>Total Cost: ${totalCost}</h1>
            <h1>Total Hours: {totalHours}</h1>
        </div>
    )
}

export default EntryTotal

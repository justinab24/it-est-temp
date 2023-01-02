import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500/view'}),
    tagTypes: ['Role', 'Component'],
    endpoints: builder => ({})
})
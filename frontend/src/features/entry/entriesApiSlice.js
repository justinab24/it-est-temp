import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const entriesAdapter = createEntityAdapter({})

const initialState = entriesAdapter.getInitialState()

export const entriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEntries: builder.query({
            query: () => '',
            validateStatus: (response, result) => {
                return response.status(200) && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedEntries = responseData.map(entry => {
                    entry.id = entry._id
                    return entry
                });
                return entriesAdapter.setAll(initialState, loadedEntries)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Entry', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Entry', id}))
                    ]
                } else return [{type: 'Entry', id: 'LIST'}]
            }
        }),
        addNewEntry: builder.mutation({
            query: initialEntryData => ({
                url: '',
                method: 'POST',
                body: {
                    ...initialEntryData
                }
            }),
            invalidatesTags: [
                { type: 'Entry', id: "LIST" }
            ]
        }),
        updateEntry: builder.mutation({
            query: initialEntryData => ({
                url: '/',
                method: 'PATCH',
                body: {
                    ...initialEntryData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Entry', id: arg.id }
            ]
        }),
        deleteEntry: builder.mutation({
            query: ({ id }) => ({
                url: '',
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Entry', id: arg.id }
            ]
        })
    })
})

export const {
    useGetEntriesQuery,
    useAddNewEntryMutation,
    useDeleteEntryMutation,
    useUpdateEntryMutation,
} = entriesApiSlice

export const selectEntriesResult = entriesApiSlice.endpoints.getEntries.select()

const selectEntriesData = createSelector(
    selectEntriesResult,
    entriesResult => entriesResult.data
)

export const {
    selectAll: selectAllEntries ,
    selectById: selectEntryById,
    selectIds: selectEntryIds
} = entriesAdapter.getSelectors(state => selectEntriesData(state) ?? initialState)
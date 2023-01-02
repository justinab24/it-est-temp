import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const compsAdapter = createEntityAdapter({})

const initialState = compsAdapter.getInitialState()

export const compsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getComponents: builder.query({
            query: () => '/components',
            validateStatus: (response, result) => {
                return response.status(200) && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedComps = responseData.map(component => {
                    component.id = component._id
                    return component
                });
                return compsAdapter.setAll(initialState, loadedComps)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Component', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Component', id}))
                    ]
                } else return [{type: 'Component', id: 'LIST'}]
            }
        }),
        addNewComponent: builder.mutation({
            query: initialComponentData => ({
                url: '/components',
                method: 'POST',
                body: {
                    ...initialComponentData
                }
            }),
            invalidatesTags: [
                { type: 'Component', id: "LIST" }
            ]
        }),
        updateComponent: builder.mutation({
            query: initialComponentData => ({
                url: '/components',
                method: 'PATCH',
                body: {
                    ...initialComponentData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Component', id: arg.id }
            ]
        }),
        deleteComponent: builder.mutation({
            query: ({ id }) => ({
                url: '/component',
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Component', id: arg.id }
            ]
        })
    })
})

export const {
    useGetComponentsQuery,
    useAddNewComponentMutation,
    useDeleteComponentMutation,
    useUpdateComponentMutation,
} = compsApiSlice

export const selectCompsResult = compsApiSlice.endpoints.getComponents.select()

const selectCompsData = createSelector(
    selectCompsResult,
    compsResult => compsResult.data
)

export const {
    selectAll: selectAllComps,
    selectById: selectCompById,
    selectIds: selectCompIds
} = compsAdapter.getSelectors(state => selectCompsData(state) ?? initialState)
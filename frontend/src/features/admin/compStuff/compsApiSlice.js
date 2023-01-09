import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const componentsAdapter = createEntityAdapter({})

const initialState = componentsAdapter.getInitialState()

export const compsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getComponents: builder.query({
            query: () => '/view/components',
            validateStatus: (response, result) => {
                return response.status(200) && !result.isError
            },
            transformResponse: responseData => {
                const loadedComps = responseData.map(component => {
                    component.id = component._id
                    return component
                });
                return componentsAdapter.setAll(initialState, loadedComps)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Component', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Component', id}))
                    ]
                } if (result?.names) {
                    return [
                        {type: 'Component', name: 'LIST'}
                    ]
                } else return [{type: 'Component', id: 'LIST'}]
            }
        }),
        addNewComponent: builder.mutation({
            query: initialComponentData => ({
                url: '/view/components',
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
                url: '/view/components',
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
                url: '/view/components',
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

export const selectComponentsResult = compsApiSlice.endpoints.getComponents.select()

const selectComponentsData = createSelector(
    selectComponentsResult,
    componentsResult => componentsResult.data
)

    

export const {
    selectAll: selectAllComponents,
    selectById: selectComponentById,
    selectIds: selectComponentIds
} = componentsAdapter.getSelectors(state => selectComponentsData(state) ?? initialState)
import { store } from "../../App/store";
import { rolesApiSlice } from "../admin/rolesApiSlice";
import { compsApiSlice } from "../admin/compsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const components = store.dispatch(compsApiSlice.endpoints.getComponents.initiate())
        const roles = store.dispatch(rolesApiSlice.endpoints.getRoles.initiate())

        return () => {
            console.log('unsubscribing')
            notes.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
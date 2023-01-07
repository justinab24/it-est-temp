import { store } from "../../app/store";
import { rolesApiSlice } from "../admin/roleStuff/rolesApiSlice";
import { compsApiSlice } from "../admin/compStuff/compsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const components = store.dispatch(compsApiSlice.endpoints.getComponents.initiate())
        const roles = store.dispatch(rolesApiSlice.endpoints.getRoles.initiate())

        return () => {
            console.log('unsubscribing')
            components.unsubscribe()
            roles.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
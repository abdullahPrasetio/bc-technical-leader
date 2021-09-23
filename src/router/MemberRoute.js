import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'

const MemberRoute = ({
    component: Component,
    match,
    path,
    location,
    ...rest
}) => {
    const ok = localStorage.getItem('BCMICRO:token')
    localStorage.removeItem('BCMICRO:redirect')

    return (
        <Route
            {...rest}
            render={(props) =>
                ok ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={`/private?path=${location.pathname}`} />
                )
            }
        />
    )
}

export default withRouter(MemberRoute)

import { createBrowserHistory } from 'history'
import {
    Home,
    Login,
    NotFoundMember,
    ProjectIndex,
    ProjectShow,
    ProjectSiteCreate,
    ProjectSiteEdit,
    ProjectSiteShow,
    ProjectUnitCreate,
    ProjectUnitEdit,
    TicketIndex,
    TicketShow,
    Unauthenticated,
} from 'pages'
import React from 'react'
import { Router, Switch } from 'react-router-dom'
import GuestRoute from './GuestRoute'
import MemberRoute from './MemberRoute'
export default function Routers() {
    const history = createBrowserHistory({ basename: process.env.PUBLIC_URL })
    return (
        <Router history={history}>
            <Switch>
                <GuestRoute component={Login} path="/login" />
                <GuestRoute component={Unauthenticated} path="/private" />
                <MemberRoute exact component={Home} path="/" />
                <MemberRoute exact component={ProjectIndex} path="/projects" />

                <MemberRoute
                    exact
                    component={ProjectShow}
                    path="/project/:id"
                />
                <MemberRoute
                    exact
                    component={ProjectSiteCreate}
                    path="/project/:id/site/create"
                />
                <MemberRoute
                    exact
                    component={ProjectSiteEdit}
                    path="/project/site/edit/:id"
                />
                <MemberRoute
                    exact
                    component={ProjectSiteShow}
                    path="/project/site/show/:id"
                />
                <MemberRoute
                    exact
                    component={ProjectUnitCreate}
                    path="/project/site/:id/unit/create"
                />
                <MemberRoute
                    exact
                    component={ProjectUnitEdit}
                    path="/project/site/unit/edit/:id"
                />
                <MemberRoute exact component={TicketIndex} path="/tickets" />
                <MemberRoute
                    exact
                    component={TicketShow}
                    path="/ticket/show/:id"
                />
                <MemberRoute component={NotFoundMember} path="/oops/404" />
            </Switch>
        </Router>
    )
}

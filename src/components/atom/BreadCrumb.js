import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function BreadCrumb({ type, link, label }) {
    if (type === 'first') {
        if (!link) {
            return (
                <h3
                    className={`text-sm font-medium ${
                        link ? 'hover:text-blue-300' : ''
                    } float-right`}
                >
                    {label}
                </h3>
            )
        }
        return (
            <Link to={link}>
                <h3
                    className={`text-sm font-medium ${
                        link ? 'hover:text-blue-300' : ''
                    } float-right`}
                >
                    {label}
                </h3>
            </Link>
        )
    }
    if (!link) {
        return (
            <>
                <h3 className="text-sm mx-2 float-right">/</h3>

                <h3
                    className={`text-sm ${
                        link ? 'hover:text-blue-300' : ''
                    } float-right`}
                >
                    {label}
                </h3>
            </>
        )
    }
    return (
        <>
            <h3 className="text-sm mx-2 float-right">/</h3>

            <Link to={link}>
                <h3
                    className={`text-sm ${
                        link ? 'hover:text-blue-300' : ''
                    } float-right`}
                >
                    {label}
                </h3>
            </Link>
        </>
    )
}

export default withRouter(BreadCrumb)

import { BreadCrumb, Layout } from 'components'
import React from 'react'

export default function Home() {
    return (
        <Layout
            title="Home"
            breadcrumb={
                <>
                    <BreadCrumb type="first" label="Home" />
                </>
            }
        >
            Home Page
        </Layout>
    )
}

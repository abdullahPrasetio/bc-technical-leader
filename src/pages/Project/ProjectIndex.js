import { BreadCrumb, Layout, ProjectTabPagination } from 'components'
import React from 'react'

function ProjectIndex() {
    return (
        <Layout
            title="Project"
            subTitle="Data Project"
            breadcrumb={<BreadCrumb type="first" label="Project" />}
        >
            <ProjectTabPagination />
        </Layout>
    )
}

export default ProjectIndex

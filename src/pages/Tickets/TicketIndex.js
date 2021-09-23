import React from 'react'
import { BreadCrumb, Layout, TicketTabPagination } from 'components'
function TicketIndex() {
    return (
        <Layout
            title="Ticket"
            subTitle="Data Ticket"
            breadcrumb={<BreadCrumb type="first" label="Ticket" />}
        >
            <TicketTabPagination />
        </Layout>
    )
}

export default TicketIndex

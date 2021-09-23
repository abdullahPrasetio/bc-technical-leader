import React from 'react'
import ImplementasiSiteTablePagination from './ImplementasiSiteTablePagination'
import ImplementasiUnitTablePagination from './ImplementasiUnitTablePagination'

function ImplementasiTabs({ project_id, status }) {
    return (
        <>
            {status === 'Implementasi' ? (
                <>
                    <ImplementasiSiteTablePagination project_id={project_id} />
                    <div className="bg-white mt-5"></div>
                    <ImplementasiUnitTablePagination
                        project_id={project_id}
                        statusUnit="all"
                    />
                </>
            ) : (
                <div className="text-center">
                    Status sedang tahap pre implementasi
                </div>
            )}
        </>
    )
}

export default ImplementasiTabs

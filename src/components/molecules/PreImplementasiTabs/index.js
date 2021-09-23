import React from 'react'
import PreImplementasiSiteTablePagination from './PreImplementasiSiteTablePagination'
import PreImplementasiUnitTablePagination from './PreImplementasiUnitTablePagination'

function PreImplementasiTabs({ project_id, status, statusUnit }) {
    return (
        <>
            {status === 'Pre Implementasi' ? (
                <>
                    <PreImplementasiSiteTablePagination
                        project_id={project_id}
                    />
                    <div className="w-full p-3"></div>
                    <PreImplementasiUnitTablePagination
                        project_id={project_id}
                        statusUnit={statusUnit}
                    />
                </>
            ) : (
                <div className="text-center">
                    Status sedang tahap implementasi
                </div>
            )}
        </>
    )
}

export default PreImplementasiTabs

import { BreadCrumb, Layout, UnitTabPagination } from 'components'
import projectSites from 'constants/api/projectSites'
import React, { useEffect, useState } from 'react'

function ProjectSiteShow({ match }) {
    const id = match.params.id
    const [data, setData] = useState({})
    useEffect(() => {
        projectSites
            .get(id)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    window.location.href = '/oops/404'
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.id])
    return (
        <Layout
            title="Site"
            subTitle="Show Site"
            breadcrumb={
                <>
                    <BreadCrumb type="first" label="Project" link="/project" />
                    <BreadCrumb
                        label={data?.project?.name}
                        link={`/project/${data?.project?.id}`}
                    />
                    <BreadCrumb label="Show Site" />
                </>
            }
        >
            <div className="bg-blue-200 rounded flex flex-wrap">
                <div className="w-1/3 px-4 py-2">
                    <div className="">Nama Customer</div>
                </div>
                <div className="w-2/3 px-4 py-2">
                    <div className="">{data?.name}</div>
                </div>
                <div className="w-1/3 px-4 py-2">
                    <div className="">Alokasi Unit</div>
                </div>
                <div className="w-2/3 px-4 py-2">
                    <div className="">{data?.alokasi_unit}</div>
                </div>
                <div className="w-1/3 px-4 py-2">
                    <div className="">Pic Onsite</div>
                </div>
                <div className="w-2/3 px-4 py-2">
                    <div className="">{data?.pic_onsite_name}</div>
                </div>
                <div className="w-1/3 px-4 py-2">
                    <div className="">Technical Onsite</div>
                </div>
                <div className="w-2/3 px-4 py-2">
                    <div className="">{data?.technical_onsite_name}</div>
                </div>

                <div className="w-1/3 px-4 py-2">
                    <div className="">Status</div>
                </div>
                <div className="w-2/3 px-4 py-2">
                    <div className="">{data?.status}</div>
                </div>
            </div>
            <div className="rounded mt-5 p-4 bg-gray-100">
                <UnitTabPagination site_id={id} />
            </div>
        </Layout>
    )
}

export default ProjectSiteShow

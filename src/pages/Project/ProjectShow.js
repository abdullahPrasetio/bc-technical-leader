import {
    BreadCrumb,
    Layout,
    ProjectGeneralTab,
    ProjectImplementasiTab,
    ProjectPreImplementasiTab,
    Tabs,
} from 'components'
import projects from 'constants/api/projects'
import React, { useEffect, useState } from 'react'
function ProjectShow({ location, history, match }) {
    const id = match.params.id
    const [data, setData] = useState({})
    const [dataChart, setDataChart] = useState({})
    const [dataSitePreImplementasi, setDataSitePreImplementasi] = useState({})
    const [dataUnitPreImplementasi, setDataUnitPreImplementasi] = useState({})
    const [dataSiteImplementasi, setDataSiteImplementasi] = useState({})
    const [dataUnitImplementasi, setDataUnitImplementasi] = useState({})
    const columnTab = [
        {
            label: 'General',
            content: (
                <ProjectGeneralTab
                    id={id}
                    dataSitePreImplementasi={dataSitePreImplementasi}
                    dataUnitPreImplementasi={dataUnitPreImplementasi}
                    dataSiteImplementasi={dataSiteImplementasi}
                    dataUnitImplementasi={dataUnitImplementasi}
                    dataChart={dataChart}
                    data={data}
                />
            ),
        },
        {
            label: 'Pre Implementasi',
            content: (
                <ProjectPreImplementasiTab
                    id={id}
                    dataSite={dataSitePreImplementasi}
                    dataUnit={dataUnitPreImplementasi}
                    project={data}
                />
            ),
        },
        {
            label: 'Implementasi',
            content: (
                <ProjectImplementasiTab
                    id={id}
                    dataSite={dataSiteImplementasi}
                    dataUnit={dataUnitImplementasi}
                    project={data}
                />
            ),
        },
    ]
    useEffect(() => {
        projects
            .get(id)
            .then((res) => {
                const completedSitePreImplementasi =
                    res.data.sitesPreImplementasi
                const progressSitePreImplementasi =
                    res.data.sitesCount - completedSitePreImplementasi
                const completedUnitPreImplementasi =
                    res.data.unitsPreImplementasi
                const progressUnitPreImplementasi =
                    res.data.qty - completedUnitPreImplementasi

                const completedSiteImplementasi = res.data.sitesImplementasi
                const progressSiteImplementasi =
                    res.data.sitesCount - completedSiteImplementasi
                const completedUnitImplementasi = res.data.unitsImplementasi
                const terkendalaUnitImplementasi = res.data.unitsTerkendala
                const progressUnitImplementasi =
                    res.data.qty - completedUnitImplementasi
                let label = []
                let labelValue = []
                let colors = []
                for (const dataObj of res.data.sitedetails) {
                    label.push(`${dataObj.name}(${dataObj.alokasi_unit})`)
                    labelValue.push(parseInt(dataObj.alokasi_unit))
                    colors.push(
                        '#' + Math.floor(Math.random() * 16777215).toString(16)
                    )
                }
                setDataSitePreImplementasi({
                    labels: ['Completed', 'Progress'],
                    datasets: [
                        {
                            data: [
                                completedSitePreImplementasi,
                                progressSitePreImplementasi,
                            ],

                            backgroundColor: ['#FF8A00', '#EBEBEB'],
                            borderColor: ['#FF8A00', '#EBEBEB'],
                        },
                    ],
                })

                setDataUnitPreImplementasi({
                    labels: ['Completed', 'Progress'],
                    datasets: [
                        {
                            data: [
                                completedUnitPreImplementasi,
                                progressUnitPreImplementasi,
                            ],

                            backgroundColor: ['#FF8A00', '#EBEBEB'],
                            borderColor: ['#FF8A00', '#EBEBEB'],
                        },
                    ],
                })

                setDataSiteImplementasi({
                    labels: ['Completed', 'Progress'],
                    datasets: [
                        {
                            data: [
                                completedSiteImplementasi,
                                progressSiteImplementasi,
                            ],

                            backgroundColor: ['#09E253', '#EBEBEB'],
                            borderColor: ['#09E253', '#EBEBEB'],
                        },
                    ],
                })

                setDataUnitImplementasi({
                    labels: ['Completed', 'Terkendala', 'Progress'],
                    datasets: [
                        {
                            data: [
                                completedUnitImplementasi,
                                terkendalaUnitImplementasi,
                                progressUnitImplementasi,
                            ],

                            backgroundColor: [
                                'rgba(9,226,83, 0.9)',
                                'rgba(227, 118, 118, 0.9)',
                                'rgba(235,235,235, 1)',
                            ],
                            borderColor: [
                                'rgba(9,226,83, 1)',
                                'rgba(227, 118, 118, 1)',
                                'rgba(235,235,235, 1)',
                            ],
                        },
                    ],
                })
                setDataChart({
                    labels: label,
                    datasets: [
                        {
                            label: '# of Votes',
                            data: labelValue,
                            backgroundColor: colors,
                            borderColor: colors,
                            borderWidth: 1,
                        },
                    ],
                })
                setData(res.data)
            })
            .catch((err) => {
                console.log(`err.response`, err.response)
                if (err.response.status === 404) {
                    window.location.href = '/oops/404'
                }
            })
    }, [id])
    return (
        <Layout
            title={`${data?.name}`}
            breadcrumb={
                <>
                    <BreadCrumb label="Project" type="first" link="/project" />
                    <BreadCrumb label="Show Project" />
                </>
            }
        >
            <div className="rounded bg-blue-100 px-3 py-2">
                <h3 className="text-xl">Status</h3>
            </div>

            <Tabs color="blue" column={columnTab} widtTab="w-full lg:w-2/3" />
        </Layout>
    )
}

export default ProjectShow

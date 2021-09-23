import { PreImplementasiTabs, Tabs } from 'components'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { withRouter } from 'react-router-dom'
import ImplementasiTabs from '../ImplementasTabs'
function ProjectGeneralTab({
    match,
    location,
    id,
    dataSitePreImplementasi,
    dataUnitPreImplementasi,
    dataSiteImplementasi,
    dataUnitImplementasi,
    dataChart,
    data,
}) {
    const active = location.search.split('=')[1]
    const columnTab = [
        {
            label: 'Pre Implementasi',
            content: (
                <PreImplementasiTabs project_id={id} status={data.status} />
            ),
        },
        {
            label: 'Implementasi',
            content: <ImplementasiTabs project_id={id} status={data.status} />,
        },
    ]

    const options = {
        responsive: false,
        cutout: 60,
        plugins: {
            legend: {
                display: false,
                position: 'right',
            },
        },
    }
    return (
        <>
            <div className="rounded px-3 py-2  flex flex-wrap">
                <div className="w-full lg:w-1/4 px-4 py-2 relative mt-5 lg:mt-0">
                    <Doughnut data={dataChart} options={options} />
                    <p className="absolute top-8 left-32 text-sm mt-2 text-center">
                        Total Unit:
                        <br />
                        <span className="text-lg">{data.qty}</span>
                        <br />
                        Total Site:
                        <br />
                        <span className="text-lg">{data.sitesCount}</span>
                    </p>
                    <div className="absolute bottom-15 left-28 text-sm mt-2 text-center">
                        <h3 className="text-xl text-center">Alokasi Unit</h3>
                    </div>
                </div>

                <div className="w-full lg:w-1/4 px-4 py-2 relative my-10 lg:my-0">
                    <Doughnut
                        data={
                            data.status === 'Pre Implementasi'
                                ? dataSitePreImplementasi
                                : dataSiteImplementasi
                        }
                        options={options}
                    />
                    <div className="absolute top-10 left-28 mx-2 text-sm mt-2 text-center">
                        <span className="text-2xl  mx-6">{`${Math.round(
                            (data.status === 'Pre Implementasi'
                                ? data.sitesPreImplementasi
                                : data.sitesImplementasi / data.sitesCount) *
                                100
                        )} %`}</span>
                        <br />
                        <span className="text-sm  mx-6">{`${
                            data.status === 'Pre Implementasi'
                                ? data.sitesPreImplementasi
                                : data.sitesImplementasi
                        }/${data.sitesCount}`}</span>
                    </div>

                    <div className="absolute bottom-15 left-24 text-sm mt-2 text-center">
                        <h3 className="text-xl text-center">
                            Pre-Implementasi
                        </h3>
                        <h3 className="text-xl text-center">(SITE)</h3>
                    </div>
                </div>

                <div className="w-full lg:w-1/4 px-4 py-2 relative my-10 lg:my-0">
                    <Doughnut data={dataUnitImplementasi} options={options} />
                    <div className="absolute top-10 left-28 mx-2 text-sm mt-2 text-center">
                        <span className="text-2xl  mx-6">{`${Math.round(
                            (data.unitsImplementasi / data.qty) * 100
                        )} %`}</span>
                        <br />
                        <span className="text-sm  mx-6">{`${data.unitsImplementasi}/${data.qty}`}</span>
                    </div>
                    <div className="absolute bottom-15 left-28 text-sm mt-2 text-center">
                        <h3 className="text-xl text-center">Implementasi</h3>
                        <h3 className="text-xl text-center">(UNIT)</h3>
                    </div>
                </div>

                <div className="w-full lg:w-1/4 px-4 py-2 relative mt-5 lg:mt-0">
                    <div className="bg-blue-100 px-4 py-2">
                        <h1 className="text-xl">Deskripsi Proyek</h1>
                        <ul>
                            <li className="text-sm mb-1">
                                {`- Nama Proyek : ${data.name}`}
                            </li>
                            <li className="text-sm mb-1">
                                {`- Nama Customer : ${data.customer_name}`}
                            </li>
                            <li className="text-sm mb-1">
                                {`- Total Unit : ${data.qty}`}
                            </li>
                            <li className="text-sm mb-1">
                                {`- Jumlah Site : ${data.sitesCount}`}
                            </li>
                            <li className="text-sm mb-1">
                                {`- PIC Pusat : ${data.pic_name}`}
                            </li>
                            <li className="text-sm mb-1">
                                {`- Project Leader : ${data.project_leader_name}`}
                            </li>
                            <li className="text-sm mb-1">
                                {`- Technical Leader : ${data.technical_leader_name}`}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="rounded bg-blue-100 px-3 py-2">
                <h3 className="text-xl">Progress</h3>
            </div>
            <div className="rounded  px-3 py-2">
                <Tabs
                    color="blue"
                    column={columnTab}
                    widtTab="w-full lg:w-2/3"
                    active={active ? parseInt(active) : 1}
                />
            </div>
        </>
    )
}

export default withRouter(ProjectGeneralTab)

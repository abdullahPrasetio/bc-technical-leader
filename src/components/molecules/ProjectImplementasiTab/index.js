import { Input, Label } from 'components/atom'
import projectUnits from 'constants/api/projectUnits'
import React, { useEffect, useState } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import ImplementasiTabs from '../ImplementasTabs'
function ProjectImplementasiTab({ id, dataSite, dataUnit, project }) {
    const [data, setData] = useState({})
    const [dataAkumulasi, setDataAkumulasi] = useState({})
    const [form, setForm] = useState({
        start: null,
        end: null,
    })
    const handle = (e) => {
        const newdata = { ...form }
        newdata[e.target.id] = e.target.value
        setForm(newdata)
    }
    useEffect(() => {
        projectUnits
            .getProgress({
                params: {
                    project_id: id,
                    start: form.start,
                    end: form.end,
                    status: 'Implementasi selesai',
                },
            })
            .then((res) => {
                setData({
                    labels: res.data.label,
                    datasets: [
                        {
                            label: '# of Progress',
                            data: res.data.dataset,
                            backgroundColor: ['rgba(196, 196, 196, 0.2)'],
                            borderColor: ['rgba(196, 196, 196, 1)'],
                            borderWidth: 1,
                        },
                    ],
                })
                setDataAkumulasi({
                    labels: res.data.label,
                    datasets: [
                        {
                            label: '# of Progress',
                            data: res.data.dataset_akumulasi,
                            backgroundColor: ['rgba(196, 196, 196, 0.2)'],
                            borderColor: ['rgba(196, 196, 196, 1)'],
                            borderWidth: 1,
                        },
                    ],
                })
            })
    }, [id, form.start, form.end])
    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
    }

    const optionDougnuts = {
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
            <div className="rounded px-3 py-2 flex flex-wrap bg-blue ">
                <div className="w-full lg:w-1/3 px-4 py-2 relative mt-5 lg:mt-0">
                    <Doughnut data={dataSite} options={optionDougnuts} />
                    <div className="absolute top-10 left-24 mx-2 text-sm mt-2 text-center">
                        <span className="text-2xl  mx-6">{`${Math.round(
                            (project.sitesPreImplementasi /
                                project.sitesCount) *
                                100
                        )} %`}</span>
                        <br />
                        <span className="text-sm  mx-6">{`${project.sitesPreImplementasi}/${project.sitesCount}`}</span>
                    </div>
                    <div className="absolute bottom-15 left-20 text-sm mt-2 text-center">
                        <h3 className="text-xl text-center">
                            Pre Implementasi
                        </h3>
                        <h3 className="text-xl text-center">(SITE)</h3>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 px-4 py-2 relative my-10 lg:my-0">
                    <Doughnut data={dataUnit} options={optionDougnuts} />
                    <div className="absolute top-10 left-24 mx-2 text-sm mt-2 text-center">
                        <span className="text-2xl  mx-6">{`${Math.round(
                            (project.unitsPreImplementasi / project.qty) * 100
                        )} %`}</span>
                        <br />
                        <span className="text-sm  mx-6">{`${project.unitsPreImplementasi}/${project.qty}`}</span>
                    </div>
                    <div className="absolute bottom-15 left-20 text-sm mt-2 text-center">
                        <h3 className="text-xl text-center">
                            Pre Implementasi
                        </h3>
                        <h3 className="text-xl text-center">(UNIT)</h3>
                    </div>
                </div>
            </div>
            <div className="rounded px-3 py-2 flex flex-wrap mt-10">
                <div className="w-full lg:w-1/4 px-4 py-2 mt-5 lg:mt-0">
                    <Label>Start Date</Label>
                    <Input type="date" id="start" onChange={(e) => handle(e)} />
                </div>
                <div className="w-full lg:w-1/4 px-4 py-2 mt-5 lg:mt-0">
                    <Label>End Date</Label>
                    <Input type="date" id="end" onChange={(e) => handle(e)} />
                </div>
                <div className="w-full px-4 py-2 mt-5 lg:mt-0">
                    <Bar data={data} options={options} height={100} />
                </div>
                <div className="w-full px-4 py-2 mt-5 lg:mt-0">
                    <Line data={dataAkumulasi} options={options} height={100} />
                </div>
            </div>
            <div className="rounded px-3 py-2 flex flex-wrap bg-blue ">
                <ImplementasiTabs
                    project_id={id}
                    status={'Implementasi'}
                    statusUnit={'all'}
                />
            </div>
        </>
    )
}

export default ProjectImplementasiTab

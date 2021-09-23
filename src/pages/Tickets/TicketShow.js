import {
    BreadCrumb,
    Button,
    CardTicket,
    Input,
    Layout,
    TextArea,
} from 'components'
import tickets from 'constants/api/tickets'
import formatDateTimes from 'helpers/formatDateTimes'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function TicketShow({ match, history }) {
    const id = match.params.id
    const [data, setData] = useState({})
    useEffect(() => {
        changeQuery()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const changeQuery = () => {
        tickets
            .get(id)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(`err.response`, err.response)
                if (err.response.status === 404) {
                    window.location.href = '/oops/404'
                }
            })
    }
    const submit = (e) => {
        e.preventDefault()
        tickets
            .reply(form, id)
            .then((res) => {
                toast.success('succes balas ticket')
                console.log(`res.data`, res.data)
                changeQuery()
                const newdata = { ...form }
                newdata['description'] = ''
                setForm(newdata)
            })
            .catch((err) => {
                console.log(`err.response`, err.response)
            })
    }
    const [form, setForm] = useState({
        id: id,
        description: '',
        filePath: [],
    })
    const handle = (e) => {
        const newdata = { ...form }
        newdata[e.target.id] = e.target.value
        setForm(newdata)
    }
    const handleFileChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const newdata = { ...form }
            const promises = files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result)
                    })
                    reader.addEventListener('error', reject)
                    reader.readAsDataURL(file)
                })
            })

            Promise.all(promises).then(
                (images) => {
                    newdata['filePath'] = images
                    setForm(newdata)
                },
                (error) => {
                    console.error(error)
                }
            )
        }
    }
    return (
        <Layout
            title={data?.title}
            subTitle="Detail Ticket"
            breadcrumb={
                <>
                    <BreadCrumb type="first" link="/tickets" label="Ticket" />
                    <BreadCrumb label="Show Ticket" />
                </>
            }
        >
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/5 lg:h-full px-4 py-2 border border-gray-400 rounded">
                    <div className="w-full">
                        <h3 className="text-2xl text-center lg:text-left">
                            Detail Ticket
                        </h3>
                    </div>
                    <div className="flex flex-row lg:flex-col flex-wrap mt-5 text-lg justify-center align-middle">
                        <div className="w-1/2 lg:w-full px-2 py-1">
                            <h3>Nomor Tiket:</h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1 m-auto">
                            <h3 className="text-sm text-gray-400 ">
                                {data?.uuid}
                            </h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1">
                            <h3>Judul Tiket:</h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1 m-auto">
                            <h3 className="text-sm text-gray-400 ">
                                {data?.title}
                            </h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1">
                            <h3>Technical Onsite:</h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1 m-auto">
                            <h3 className="text-sm text-gray-400 ">
                                {data?.user_created_name}
                            </h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1">
                            <h3>Prioritas:</h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1 m-auto">
                            <h3 className="text-sm text-gray-400 ">
                                {data?.prioritas}
                            </h3>
                        </div>
                        {data?.detail_columns?.length > 0 &&
                            data?.detail_columns.map((item, index) => {
                                return (
                                    <>
                                        <div className="w-1/2 lg:w-full px-2 py-1">
                                            <h3>{item?.property.name}:</h3>
                                        </div>
                                        <div className="w-1/2 lg:w-full px-2 py-1 m-auto">
                                            <h3 className="text-sm text-gray-400 ">
                                                {item?.value}
                                            </h3>
                                        </div>
                                    </>
                                )
                            })}

                        <div className="w-1/2 lg:w-full px-2 py-1">
                            <h3>Tanggal Submit:</h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1 m-auto">
                            <h3 className="text-sm text-gray-400 ">
                                {formatDateTimes(data?.created_at, 'datefull')}
                            </h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1">
                            <h3>Update Terakhir:</h3>
                        </div>
                        <div className="w-1/2 lg:w-full px-2 py-1 m-auto">
                            <h3 className="text-sm text-gray-400 ">
                                {formatDateTimes(data?.created_at, 'datefull')}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-4/5 p-4 bg-gray-100 mt-5 lg:mt-0">
                    <CardTicket
                        header={
                            <>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="text-sm text-white justify-center">
                                            Balas
                                        </h3>
                                    </div>
                                    <div className="flex flex-col justify-center"></div>
                                </div>
                            </>
                        }
                    >
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <TextArea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={(e) => handle(e)}
                                ></TextArea>
                            </div>
                            <div className="mb-3">
                                <Input
                                    type="file"
                                    onChange={(e) => handleFileChange(e)}
                                    multiple={true}
                                />
                            </div>
                            <div className="flex flex-row justify-end">
                                <Button>Kirim</Button>
                            </div>
                        </form>
                    </CardTicket>
                    <div className="my-10 w-full"></div>
                    {data?.contents?.length > 0 &&
                        data?.contents?.map((item, index) => {
                            return (
                                <CardTicket
                                    key={index}
                                    header={
                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-col">
                                                <h3 className="text-sm text-white justify-center">
                                                    {item.user_name}
                                                </h3>
                                                <h3 className="text-xs text-gray-400">
                                                    {item.user_role}
                                                </h3>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h3 className="text-sm text-white">
                                                    {formatDateTimes(
                                                        item.created_at,
                                                        'date'
                                                    )}
                                                </h3>
                                                <h3 className="text-xs text-gray-400">
                                                    {formatDateTimes(
                                                        item.created_at
                                                    )}
                                                </h3>
                                            </div>
                                        </div>
                                    }
                                >
                                    {item.description}
                                    {item?.files?.length > 0 && (
                                        <div className="border-t w-full px-4 py-2 mt-4 bg-blue-200">
                                            {item?.files?.length > 0 &&
                                                item?.files.map(
                                                    (file, index) => {
                                                        return (
                                                            <>
                                                                <a
                                                                    href={`${file.filePath}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    File{' '}
                                                                    {index + 1}
                                                                </a>
                                                                <br />
                                                            </>
                                                        )
                                                    }
                                                )}
                                        </div>
                                    )}
                                </CardTicket>
                            )
                        })}
                </div>
            </div>
        </Layout>
    )
}

export default TicketShow

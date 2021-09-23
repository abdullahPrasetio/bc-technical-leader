import projectSites from 'constants/api/projectSites'
import { useForm } from 'helpers'
import React, { useEffect, useState } from 'react'

function ImplementasiSiteTablePagination({ project_id }) {
    const [site, setSite] = useState({})
    const [{ q, limit }, setState] = useForm({
        q: '',
        limit: 25,
    })
    const [page, setPage] = useState(1)
    useEffect(() => {
        changeQuery()
    }, [q, limit, page]) // eslint-disable-line react-hooks/exhaustive-deps

    const changeQuery = () => {
        projectSites
            .getAll({
                params: {
                    q,
                    limit,
                    page,
                    project_id,
                },
            })
            .then((res) => {
                setSite(res.data)
            })
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between px-5">
                <select
                    name="limit"
                    value={limit}
                    onChange={setState}
                    id=""
                    className="border border-gray-400 rounded px-2 focus:outline-none"
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <input
                    type="text"
                    name="q"
                    value={q}
                    onChange={setState}
                    className="w-3/3 border px-2 focus:outline-none rounded"
                />
            </div>
            <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                <thead className="text-white ">
                    <tr className="bg-gray-700 flex lg:flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 hidden text-sm">
                        <th className="p-3 text-left">Nama Site</th>
                        <th className="p-3 text-left">Alokasi Unit</th>
                        <th className="p-3 text-left">
                            Requirement Belum Sesuai
                        </th>
                        <th className="p-3 text-left">Requirement Sesuai</th>
                        <th className="p-3 text-left">Progress</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">PIC Onsite</th>
                        <th className="p-3 text-left">Technical Onsite</th>
                    </tr>
                </thead>
                <tbody className="flex-1 sm:flex-none">
                    {site?.data?.map((item) => {
                        return (
                            <tr
                                key={item.id}
                                className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 hover:bg-gray-100 "
                            >
                                <td className="border-grey-light border p-3">
                                    {item.name}
                                </td>
                                <td className="border-grey-light border p-3 truncate">
                                    {item.alokasi_unit}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.alokasi_unit - item.progress}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.progress}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip w-full lg:w-56">
                                    <div className="flex flex-wrap w-full">
                                        <div className="shadow w-3/4 bg-grey-light">
                                            <div
                                                className="bg-yellow-500 h-full text-center text-white"
                                                style={{
                                                    width: `${
                                                        (item.progress /
                                                            item.alokasi_unit) *
                                                        100
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="w-1/4 text-xs leading-none px-2">
                                            {`${
                                                (item.progress /
                                                    item.alokasi_unit) *
                                                100
                                            }%`}
                                        </div>
                                    </div>
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.status}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.pic_onsite_name}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.technical_onsite_name}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="mt-3 flex flex-col lg:flex-row items-center justify-between px-5 bg-gray-300 sticky w-full bottom-0 py-4">
                <div className="flex items-center">
                    <p className="text-sm">
                        Showing {site?.from} to {site?.to} of {site?.total}
                    </p>
                </div>
                <div className="flex items-center">
                    {site?.links?.map((item, index) => {
                        const lengtArray = site.links.length
                        return (
                            <button
                                onClick={() => {
                                    let numberPage = item.label
                                    if (index === 0) {
                                        if (page !== 1) {
                                            numberPage = page - 1
                                        } else {
                                            numberPage = page
                                        }
                                    }
                                    if (lengtArray === index + 1) {
                                        if (page !== site.last_page) {
                                            numberPage = page + 1
                                        } else {
                                            numberPage = page
                                        }
                                    }
                                    setPage(numberPage)
                                }}
                                key={index}
                                className={`px-1 mt-3 lg:mt-0 lg:px-2 focus:outline-none focus:ring-blue-200 ring-2  mx-1 cursor-pointer bg-gray-100 hover:text-white text-sm hover:bg-blue-500 rounded-full ${
                                    item.active ? 'bg-blue-500 text-white' : ''
                                }`}
                            >
                                {index === 0 ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : lengtArray === index + 1 ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    item.label
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ImplementasiSiteTablePagination

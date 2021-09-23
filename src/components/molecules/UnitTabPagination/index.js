import projectUnits from 'constants/api/projectUnits'
import { useForm } from 'helpers'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function UnitTabPagination({ site_id }) {
    const [data, setData] = useState({})
    const [{ q, limit }, setState] = useForm({
        q: '',
        limit: 25,
    })
    const [page, setPage] = useState(1)
    useEffect(() => {
        changeQuery()
    }, [q, limit, page]) // eslint-disable-line react-hooks/exhaustive-deps

    const changeQuery = () => {
        projectUnits
            .getAll({
                params: {
                    q,
                    limit,
                    page,
                    site_id,
                    status: 'all',
                },
            })
            .then((res) => {
                setData(res.data)
            })
    }

    const dropdown = (e) => {
        let element = e.target
        let svg = element.getElementsByTagName('svg')[0]
        svg.classList.add('rotate-90')
        let nextSibling = element.nextSibling
        let containsHidden = nextSibling.classList.contains('hidden')
        if (!containsHidden) {
            nextSibling.classList.add('hidden')
            svg.classList.remove('rotate-90')
        } else {
            nextSibling.classList.remove('hidden')
        }
    }

    const onDelete = (id) => {
        projectUnits.delete(id).then((res) => {
            toast.success(res.message)
            changeQuery()
        })
    }
    const onChangeStatus = (id, status) => {
        projectUnits.updateStatus({ id, status }).then((res) => {
            toast.success(res.message)
            changeQuery()
        })
    }

    return (
        <div>
            <div className="flex justify-end mb-4 px-5">
                <Link
                    to={`/project/site/${site_id}/unit/create`}
                    className="bg-blue-500 px-4 py-2 rounded text-white"
                >
                    Create data
                </Link>
            </div>
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
                    <tr className="bg-gray-700 flex lg:flex-col fex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 hidden text-sm">
                        <th className="p-3 text-left">Nama Unit</th>
                        <th className="p-3 text-left">Jenis Unit</th>

                        {data?.data?.length > 0 &&
                            data?.data[0].details?.map((item, index) => {
                                return (
                                    <th key={index} className="p-3 text-left">
                                        {item.property_unit.name}
                                    </th>
                                )
                            })}
                        <th className="p-3 text-left">Site</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">PIC Onsite</th>
                        <th className="p-3 text-left">Technical Onsite</th>
                        <th className="p-3 text-left" width="110px">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="flex-1 sm:flex-none">
                    {data?.data?.map((item) => {
                        return (
                            <tr
                                key={item.id}
                                className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 hover:bg-gray-100 "
                            >
                                <td className="border-grey-light border p-3">
                                    {item.name}
                                </td>
                                <td className="border-grey-light border p-3 truncate">
                                    {item.unit.name}
                                </td>
                                {item?.details?.map((value, index) => {
                                    return (
                                        <td
                                            key={index}
                                            className="border-grey-light border p-3 truncate"
                                        >
                                            {value.value}
                                        </td>
                                    )
                                })}
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.siteproject.name}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.status}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.siteproject.pic_onsite_name}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.siteproject.technical_onsite_name}
                                </td>
                                <td className="border-grey-light border p-3 text-gray-700 hover:text-gray-600 hover:font-medium cursor-pointer">
                                    <div>
                                        <button
                                            onClick={dropdown}
                                            className={[
                                                'w-full nav-link py-2 px-4 rounded block focus:outline-none hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center justify-between',
                                            ].join(' ')}
                                        >
                                            <>Action</>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 pointer-events-none transform transition-transform duration-200"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        <div className="ml-8 hidden overflow-hidden animate-accordion">
                                            {item.status ===
                                                'Requirement belum sesuai' && (
                                                <>
                                                    <Link
                                                        to={`/project/site/unit/edit/${item.id}`}
                                                        className="w-full nav-link py-2 px-4 rounded block focus:outline-none hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center justify-between"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <div
                                                        onClick={() =>
                                                            onChangeStatus(
                                                                item.id,
                                                                'Requirement sesuai'
                                                            )
                                                        }
                                                        className="w-full py-2 px-4 rounded block focus:outline-none hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center justify-between"
                                                    >
                                                        Requirement sesuai
                                                    </div>
                                                    <div
                                                        onClick={() =>
                                                            onDelete(item.id)
                                                        }
                                                        className="w-full py-2 px-4 rounded block focus:outline-none hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center justify-between"
                                                    >
                                                        Delete
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="mt-3 flex flex-col lg:flex-row items-center justify-between px-5 bg-gray-300 sticky w-full bottom-0 py-4">
                <div className="flex items-center">
                    <p className="text-sm">
                        Showing {data?.from} to {data?.to} of {data?.total}
                    </p>
                </div>
                <div className="flex items-center">
                    {data?.links?.map((item, index) => {
                        const lengtArray = data.links.length
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
                                        if (page !== data.last_page) {
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

export default UnitTabPagination

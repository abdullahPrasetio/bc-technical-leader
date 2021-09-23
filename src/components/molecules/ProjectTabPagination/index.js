import projects from 'constants/api/projects'
import { useForm } from 'helpers'
import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProjectTabPagination() {
    const [project, setProject] = useState({})
    const [{ q, limit }, setState] = useForm({
        q: '',
        limit: 25,
    })
    const [page, setPage] = useState(1)
    useEffect(() => {
        changeQuery()
    }, [q, limit, page]) // eslint-disable-line react-hooks/exhaustive-deps

    const changeQuery = () => {
        projects
            .getAll({
                params: {
                    q,
                    limit,
                    page,
                },
            })
            .then((res) => {
                setProject(res.data)
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

    const onChangeStatus = (id, status) => {
        projects.updateStatus({ id, status }).then((res) => {
            toast.success(res.message)
            changeQuery()
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
                        <th className="p-3 text-left">Nama Proyek</th>
                        <th className="p-3 text-left">Nama Customer</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Jumlah Site</th>
                        <th className="p-3 text-left">Total Unit</th>
                        <th className="p-3 text-left">Site</th>
                        <th className="p-3 text-left">Unit</th>
                        <th className="p-3 text-left" width="110px">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="flex-1 sm:flex-none">
                    {project?.data?.map((item) => {
                        return (
                            <tr
                                key={item.id}
                                className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 hover:bg-gray-100 "
                            >
                                <td className="border-grey-light border p-3">
                                    {item.name}
                                </td>
                                <td className="border-grey-light border p-3 truncate">
                                    {item.customer_name}
                                </td>
                                <td className="border-grey-light border p-3 truncate">
                                    {item.status}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.sitesCount}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {item.qty}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {`${
                                        item.sites > 0
                                            ? Math.round(
                                                  (item.sites /
                                                      item.sitesCount) *
                                                      100
                                              )
                                            : 0
                                    }% (${item.sites}/${item.sitesCount})`}
                                </td>
                                <td className="border-grey-light border p-3 sm:overflow-clip">
                                    {`${Math.round(
                                        (item.units / item.qty) * 100
                                    )}% (${item.units}/${item.qty})`}
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
                                            <Link
                                                to={`/project/${item.id}`}
                                                className="w-full nav-link py-2 px-4 rounded block focus:outline-none hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center justify-between"
                                            >
                                                Show
                                            </Link>
                                            <div
                                                onClick={() =>
                                                    onChangeStatus(
                                                        item.id,
                                                        'Implementasi'
                                                    )
                                                }
                                                className="w-full py-2 px-4 rounded block focus:outline-none hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center justify-between"
                                            >
                                                Implementasi
                                            </div>
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
                        Showing {project?.from} to {project?.to} of{' '}
                        {project?.total}
                    </p>
                </div>
                <div className="flex items-center">
                    {project?.links?.map((item, index) => {
                        const lengtArray = project.links.length
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
                                        if (page !== project.last_page) {
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

export default withRouter(ProjectTabPagination)
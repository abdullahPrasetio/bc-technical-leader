import { useEffect } from 'react'
import Sidebar from '../Sidebar'

export default function Layout({
    children,
    title = process.env.REACT_APP_NAME,
    subTitle,
    breadcrumb,
}) {
    useEffect(() => {
        document.title = title
    }, [title])
    return (
        <>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/5">
                    <Sidebar />
                </div>
                <div className="w-full lg:w-4/5 mt-16 lg:mt-0">
                    <div className="px-4 py-5">
                        <h3 className="text-2xl font-medium">{title}</h3>
                        <p className="text-sm text-gray-400">{subTitle}</p>
                    </div>
                    <div className="bg-gray-200 py-3 px-4 w-full flex flex-row">
                        {breadcrumb}
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </div>
        </>
    )
}

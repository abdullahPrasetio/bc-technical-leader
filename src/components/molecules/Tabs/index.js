import React from 'react'

const Tabs = ({ color, column, widtTab = 'w-full', active = 1 }) => {
    const [openTab, setOpenTab] = React.useState(active)
    return (
        <>
            <div className="flex flex-wrap">
                <div className={widtTab}>
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        {column.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className="-mb-px mx-1 last:mr-0 flex-auto text-center cursor-pointer"
                                >
                                    <a
                                        className={
                                            'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                                            (openTab === index + 1
                                                ? 'text-white bg-' +
                                                  color +
                                                  '-600'
                                                : 'text-' +
                                                  color +
                                                  '-600 bg-white')
                                        }
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setOpenTab(index + 1)
                                        }}
                                        data-toggle="tab"
                                        role="tablist"
                                        href={`#link${index + 1}`}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                {column?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={
                                                openTab === index + 1
                                                    ? 'block'
                                                    : 'hidden'
                                            }
                                        >
                                            {item.content}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tabs

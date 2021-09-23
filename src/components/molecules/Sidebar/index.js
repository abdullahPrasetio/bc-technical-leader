import users from 'constants/api/users'
import { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'

function Sidebar({ match, history }) {
    const [toggle, setToggle] = useState(false)
    const getNavLinkClass = (path) => {
        return match.path.split('/')[1] === path
            ? 'active text-white bg-gray-700'
            : 'text-gray-400'
    }

    const logout = () => {
        users.logout().then((res) => {
            localStorage.removeItem('BCMICRO:token')
            history.push('/login')
        })
    }
    return (
        <div className="bg-gray-800 lg:h-screen fixed w-full lg:w-1/5 flex flex-col justify-between z-20">
            <div className="flex justify-between p-4 border-b border-gray-700">
                <div className="text-lg text-white font-medium">
                    Bangun Candi
                </div>
                <button
                    onClick={() => setToggle(!toggle)}
                    className="focus:outline-none block lg:hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16"
                            className={toggle === true ? 'hidden' : ''}
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                            className={toggle === false ? 'hidden' : ''}
                        />
                    </svg>
                </button>
            </div>
            <div
                className={`${
                    toggle ? '' : 'hidden'
                } lg:block lg:h-full h-screen overflow-y-auto p-4 leading-relaxed`}
            >
                <Link
                    className={[
                        'nav-link py-2 px-4 rounded block  hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center',
                        getNavLinkClass(''),
                    ].join(' ')}
                    to="/"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Home
                </Link>

                <Link
                    className={[
                        'nav-link py-2 px-4 rounded block  hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center',
                        getNavLinkClass('projects'),
                    ].join(' ')}
                    to="/projects"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    Project
                </Link>
                <Link
                    className={[
                        'nav-link py-2 px-4 rounded block  hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center',
                        getNavLinkClass('tickets'),
                    ].join(' ')}
                    to="/tickets"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                    Ticket
                </Link>
                <button
                    onClick={logout}
                    className="py-2 px-4 rounded hover:text-white active:text-white hover:bg-gray-700 my-1 flex items-center text-gray-400 w-full"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default withRouter(Sidebar)

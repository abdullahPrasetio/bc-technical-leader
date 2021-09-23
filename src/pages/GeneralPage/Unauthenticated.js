import { Link } from 'react-router-dom'
import privateImage from 'assets/images/illustration-private.jpg'
function Unauthenticated({ fallbackUrl, fallbackText, external }) {
    return (
        <section className="h-screen flex flex-col items-center bg-white">
            <img
                src={privateImage}
                alt="you are not supposed here, please login"
            />
            <h1 className="text-3xl text-gray-900 mt-12">
                Wow! How are you here?
            </h1>
            <p className="text-lg text-gray-600 mt-4 mtb-8 lg:w-3/12 xl:w-2/12 mx-auto text-center">
                Seems like you do not have access for this page. We are sorry.
            </p>
            {external ? (
                <a
                    className="bg-yellow-500 hover:bg-yellow-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-5"
                    href={fallbackUrl}
                >
                    {fallbackText || 'Logging me in'}
                </a>
            ) : (
                <Link
                    className="bg-yellow-500 hover:bg-yellow-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-5"
                    to={fallbackUrl || '/login'}
                >
                    {fallbackText || 'Logging me in'}
                </Link>
            )}
        </section>
    )
}

export default Unauthenticated

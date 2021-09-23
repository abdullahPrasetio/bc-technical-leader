export default function Card({ children, header }) {
    return (
        <>
            <div className="w-full lg:w-1/3 p-4 shadow-lg bg-gray-900 rounded-t-lg">
                {header}
            </div>
            <div className="lg:w-1/3 w-full bg-white p-6 rounded-b-lg">
                {children}
            </div>
        </>
    )
}

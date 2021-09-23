export const Label = ({ children, ...props }) => {
    return (
        <label {...props} className="block text-sm mb-1 capitalize">
            {children}
        </label>
    )
}

export const Input = (props) => {
    return (
        <input
            {...props}
            className="px-3 py-2 w-full border border-gray-300 rounded focus:border-gray-400 focus:ring-2 ring-gray-200 focus:outline-none transition-colors duration-300"
        />
    )
}

export const TextArea = ({ children, ...props }) => {
    return (
        <textarea
            {...props}
            rows="5"
            className="px-3 py-2 w-full rounded border focus:outline-none focus:ring-2 ring-gray-200 focus:border-gray-300"
        >
            {children}
        </textarea>
    )
}

export const Button = ({
    children,
    addCustomClass,
    bgColor = 'bg-blue-500 ',
    type,
    hoverColor = 'hover:bg-blue-700',
    textColor = 'text-white',
    ringColor = 'ring-blue-200',
    ...props
}) => {
    if (type === 'danger') {
        return (
            <button
                {...props}
                className={[
                    `bg-red-500 focus:outline-none transition-colors duration-150 focus:ring-2 ring-red-200 hover:bg-red-700 px-4 py-2 rounded text-white`,
                    addCustomClass,
                ].join(' ')}
            >
                {children}
            </button>
        )
    }
    if (type === 'warning') {
        return (
            <button
                {...props}
                className={[
                    `bg-yellow-500 focus:outline-none transition-colors duration-150 focus:ring-2 ring-yellow-200 hover:bg-yellow-600 px-4 py-2 rounded text-white`,
                    addCustomClass,
                ].join(' ')}
            >
                {children}
            </button>
        )
    }

    if (type === 'success') {
        return (
            <button
                {...props}
                className={[
                    `bg-green-500 focus:outline-none transition-colors duration-150 focus:ring-2 ring-green-200 hover:bg-green-700 px-4 py-2 rounded text-white`,
                    addCustomClass,
                ].join(' ')}
            >
                {children}
            </button>
        )
    }

    return (
        <button
            {...props}
            className={[
                `${bgColor} focus:outline-none transition-colors duration-150 focus:ring-2 ${ringColor} ${hoverColor} px-4 py-2 rounded ${textColor}`,
                addCustomClass,
            ].join(' ')}
        >
            {children}
        </button>
    )
}

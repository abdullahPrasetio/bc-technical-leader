import { useState } from 'react'

const useForm = (initialValues) => {
    const [state, setState] = useState(initialValues)

    return [
        state,
        (e) => {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            })
        },
        (newState) => {
            setState({
                ...state,
                ...newState,
            })
        },
    ]
}

export default useForm

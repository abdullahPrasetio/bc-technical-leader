import { Button, Card, Input, Label } from 'components'
import users from 'constants/api/users'
import React, { useState } from 'react'
import Logo from 'assets/images/logo.png'

export default function Login({ history }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const submit = (e) => {
        e.preventDefault()
        users.login({ ...form }).then((res) => {
            localStorage.setItem(
                'BCMICRO:token',
                JSON.stringify({
                    ...res.data,
                    email: form.email,
                })
            )
            const redirect = localStorage.getItem('BCMICRO:redirect')
            history.push(redirect || '/')
        })
    }

    const handle = (e) => {
        const newdata = { ...form }
        newdata[e.target.id] = e.target.value
        setForm(newdata)
    }
    console.log(`form`, form)
    return (
        <div className="bg-gray-700">
            <div className="flex flex-col items-center justify-center h-screen">
                <img src={Logo} alt="" className="w-20 mb-5" />
                <Card
                    header={
                        <>
                            <h3 className="text-lg text-white">Login</h3>
                        </>
                    }
                >
                    <form onSubmit={submit}>
                        <div className="mb-5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={form.email}
                                onChange={(e) => handle(e)}
                            />
                        </div>

                        <div className="mb-5">
                            <Label htmlFor="password">password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={(e) => handle(e)}
                            />
                        </div>

                        <Button addCustomClass="float-right">Login</Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}

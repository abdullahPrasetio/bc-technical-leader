import { BreadCrumb, Button, Input, Label, Layout } from 'components'
import projects from 'constants/api/projects'
import projectSites from 'constants/api/projectSites'
import sites from 'constants/api/sites'
import users from 'constants/api/users'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function ProjectSiteCreate({ match, history }) {
    const id = match.params.id
    const [project, setProject] = useState({})
    const [dataSite, setDataSite] = useState([])
    const [dataPic, setDataPic] = useState([])
    const [dataTechnical, setDataTechnical] = useState([])
    const [data, setData] = useState({
        name: '',
        technical_onsite_id: '',
        pic_onsite_id: '',
        technical_onsite_name: '',
        pic_onsite_name: '',
        alokasi_unit: '',
        site_id: '',
        project_id: id,
    })
    useEffect(() => {
        projects
            .get(id)
            .then((res) => {
                setProject(res.data)
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    window.location.href = '/oops/404'
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.id])
    useEffect(() => {
        sites
            .getAll({
                params: {
                    customer_id: project.customer_id,
                    limit: 40,
                },
            })
            .then((res) => {
                setDataSite(res.data)
            })
        users
            .getUsers({
                params: {
                    customer_id: project.customer_id,
                },
            })
            .then((res) => {
                setDataPic(res.data)
            })
        users
            .getUsers({
                params: {
                    role: 'Technical Onsite',
                },
            })
            .then((res) => {
                setDataTechnical(res.data)
            })
    }, [project.customer_id])
    const handle = (e) => {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        if (
            e.target.id === 'site_id' ||
            e.target.id === 'pic_onsite_id' ||
            e.target.id === 'technical_onsite_id'
        ) {
            newdata[
                e.target[e.target.selectedIndex].getAttribute('data-field')
            ] = e.target[e.target.selectedIndex].getAttribute('data-name')
        }
        setData(newdata)
    }
    const submit = (e) => {
        e.preventDefault()
        projectSites.create(data).then((res) => {
            toast.success('Succes create data sites')
            history.push(`/project/${id}`)
        })
    }
    return (
        <Layout
            title="Create Site"
            subTitle="Create Site "
            breadcrumb={
                <>
                    <BreadCrumb type="first" label="Project" link="/project" />
                    <BreadCrumb label={project.name} link={`/project/${id}`} />
                    <BreadCrumb label="Create Site" />
                </>
            }
        >
            <form onSubmit={submit}>
                <div className="mb-3">
                    <Label htmlFor="site_id">Name</Label>
                    <select
                        value={data.site_id}
                        name="site_id"
                        id="site_id"
                        className="px-3 py-2 w-full border border-gray-300 rounded focus:border-gray-400 focus:ring-2 ring-gray-200 focus:outline-none transition-colors duration-300"
                        onChange={(e) => handle(e)}
                    >
                        <option value="">Pilih</option>
                        {dataSite?.data?.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item.id}
                                    data-name={item.name}
                                    data-field="name"
                                >
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <Label htmlFor="alokasi_unit">Alokasi Unit</Label>
                    <Input
                        name="alokasi_unit"
                        type="text"
                        id="alokasi_unit"
                        value={data.alokasi_unit}
                        onChange={(e) => handle(e)}
                    />
                </div>
                <div className="mb-3">
                    <Label htmlFor="pic_onsite_id">Pic Onsite Name</Label>
                    <select
                        value={data.pic_onsite_id}
                        name="pic_onsite_id"
                        id="pic_onsite_id"
                        className="px-3 py-2 w-full border border-gray-300 rounded focus:border-gray-400 focus:ring-2 ring-gray-200 focus:outline-none transition-colors duration-300"
                        onChange={(e) => handle(e)}
                    >
                        <option value="">Pilih</option>
                        {dataPic?.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item.id}
                                    data-name={item.name}
                                    data-field="pic_onsite_name"
                                >
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="mb-3">
                    <Label htmlFor="technical_onsite_id">
                        Technical Onsite Name
                    </Label>
                    <select
                        value={data.technical_onsite_id}
                        name="technical_onsite_id"
                        id="technical_onsite_id"
                        className="px-3 py-2 w-full border border-gray-300 rounded focus:border-gray-400 focus:ring-2 ring-gray-200 focus:outline-none transition-colors duration-300"
                        onChange={(e) => handle(e)}
                    >
                        <option value="">Pilih</option>
                        {dataTechnical?.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item.id}
                                    data-name={item.name}
                                    data-field="technical_onsite_name"
                                >
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <Button addCustomClass="w-full mt-10">Create</Button>
                </div>
            </form>
        </Layout>
    )
}

export default ProjectSiteCreate

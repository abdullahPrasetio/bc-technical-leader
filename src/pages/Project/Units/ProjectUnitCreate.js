import { BreadCrumb, Button, Input, Label, Layout } from 'components'
import projectSites from 'constants/api/projectSites'
import projectUnits from 'constants/api/projectUnits'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function ProjectUnitCreate({ match, history }) {
    const id = match.params.id
    const [site, setSite] = useState({})
    const [units, setUnits] = useState([])
    const [unitProperties, setUnitProperties] = useState([])
    const [data, setData] = useState({
        site_project_id: id,
        unit_id: 0,
        name: '',
        properti_unit_id: [],
        value: [],
    })
    useEffect(() => {
        projectSites
            .get(id)
            .then((res) => {
                setSite(res.data)
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    window.location.href = '/oops/404'
                }
            })
    }, [id])
    useEffect(() => {
        projectUnits.getVariant().then((res) => {
            setUnits(res.data)
        })
    }, [])
    useEffect(() => {
        projectUnits.getProperties(data.unit_id).then((res) => {
            setUnitProperties(res.data)
            const properties = []
            Object.keys(res.data).forEach((item) => {
                properties.push(item.id)
            })
            const newdata = { ...data }
            newdata['properti_unit_id'] = properties
            setData(newdata)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.unit_id])
    const handle = (e) => {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    const handleInputDynamic = (index) => (e) => {
        const newdata = { ...data }
        newdata['value'][index] = e.target.value
        setData(newdata)
    }
    const submit = (e) => {
        e.preventDefault()
        projectUnits.create(data).then((res) => {
            toast.success('Succes create data units')
            history.push(`/project/site/show/${id}`)
        })
    }
    return (
        <Layout
            title="Units"
            subTitle="Create Unit"
            breadcrumb={
                <>
                    <BreadCrumb
                        type="first"
                        label="Project"
                        link={`/project/${site?.project?.id}`}
                    />
                    <BreadCrumb
                        label={site?.name}
                        link={`/project/site/show/${id}`}
                    />
                    <BreadCrumb label="Create Unit" />
                </>
            }
        >
            <form onSubmit={submit}>
                <div className="mb-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        name="name"
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => handle(e)}
                    />
                </div>
                <div className="mb-3">
                    <Label htmlFor="unit_id">Unit Type</Label>
                    <select
                        value={data.unit_id}
                        name="unit_id"
                        id="unit_id"
                        className="px-3 py-2 w-full border border-gray-300 rounded focus:border-gray-400 focus:ring-2 ring-gray-200 focus:outline-none transition-colors duration-300"
                        onChange={(e) => handle(e)}
                    >
                        <option value="0">Pilih</option>
                        {units?.map((item, index) => {
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

                {unitProperties?.map((item, index) => {
                    return (
                        <div className="mb-3" key={index}>
                            <Label htmlFor="name">{item.name}</Label>
                            <Input
                                name="value[]"
                                multiple="true"
                                type="text"
                                id="value[]"
                                value={data.value[index]}
                                onChange={handleInputDynamic(index)}
                            />
                        </div>
                    )
                })}
                <div className="mb-3">
                    <Button addCustomClass="w-full mt-10">Create</Button>
                </div>
            </form>
        </Layout>
    )
}

export default ProjectUnitCreate

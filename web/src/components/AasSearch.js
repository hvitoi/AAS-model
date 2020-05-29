// Packages
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import { Link } from 'react-router-dom'

// -------------------------

const AasSearch = () => {

    // State Hook
    const [id, setId] = useState('')
    const [term, setTerm] = useState('')
    const [aasList, setAasList] = useState([])


    // List all AAS's
    const getAll = async () => {
        try {
            const res = await axios.get('/api/aas')
            setAasList(res.data)
        } catch {
            setAasList([])
        } 
    }

    // List one AAS by ID
    const getOne = async (id) => {
        try {
            const res = await axios.get('/api/aas/' + id)
            setAasList([res.data])
        } catch {
            setAasList([])
        }
    }

    // Refresh if 'id' changes
    useEffect(() => {
        if(id) {
            getOne(id)
        } else {
            getAll()
        }
    }, [id])


    // Handle submit button
    const handleSubmit = (event) => {
        event.preventDefault()
        setId(term)
    }


    const renderList = () => {
        if(aasList.length !== 0) {
            return aasList.map(aas => (
                <tr key={aas._id}>
                    <td><Link to={'/aas/' + aas._id}>{aas._id}</Link></td>
                    <td>{aas.namePlate}</td>
                    <td>{aas.description}</td>
                </tr>
            ))
        }
        return <tr><td colSpan="3">No AAS to show.</td></tr>
    }

    
    return (
        <div className="container">

            <nav className="navbar navbar-light bg-light">
      
                <form className="form-inline" onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="aasId">UUID</label>
                        <input className="form-control" id="aasId" type="text" placeholder="UUID" value={term} onChange={ e => setTerm(e.target.value) } />
                    </div>
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>

                <Link className="btn btn-warning float-right" to="/aas/new" >Create AAS</Link>

            </nav>

 


            <div className="table-responsive-sm">
                <table className="table table-striped table-sm table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nameplate</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        { renderList() }
                    </tbody>

                </table>
            </div>
            
            <Link className="btn btn-outline-primary" to={'/'}>Home</Link>

        </div>
    )
}

export default AasSearch
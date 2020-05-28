// Packages
import React from 'react'
import axios from 'axios'

// Components 
import { Link } from 'react-router-dom'
import ReactJson from 'react-json-view'

// Hooks
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

// -------------------------

const AasShow = () => {
    const { id } = useParams()
    const [aas, setAas] = useState([])
    const [editedAas, setEditedAas] = useState([aas])

    // List AAS by ID
    const getAas = async (id) => {
        try {
            const res = await axios.get('/api/aas/' + id)
            setAas(res.data)
        } catch {
            setAas({})
        }
    }

    // Refresh if 'id' changes
    useEffect(() => {
        if(id) {
            getAas(id)
        } else {
            getAas()
        }
    }, [id])

    const test = (edit) => {
        setEditedAas(edit)
        console.log(edit);
        
    }
    return (
        <div className="container">

    
            <ReactJson 
                src={aas}
                enableClipboard={ false }
                onEdit={ edit => setEditedAas(edit.updated_src) }
                onAdd={ edit => setEditedAas(edit.updated_src) }
                onDelete={ edit => setEditedAas(edit.updated_src) }
            />
            
            <Link className="btn btn-link" to={'/aas'}>AAS List</Link>

        </div>
    )
}
export default AasShow
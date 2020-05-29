// Packages
import React from 'react'
import axios from 'axios'
import { diff } from 'deep-object-diff'
import _ from 'lodash'


// Components 
import { Link } from 'react-router-dom'
import ReactJson from 'react-json-view'

// Hooks
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

// Browse History
import history from '../history'

// -------------------------

const AasShow = () => {
    const [aas, setAas] = useState({})
    const [editedAas, setEditedAas] = useState({})
    const { id } = useParams()

    // Get new AAS if 'id' changes
    useEffect(() => {
        getAas(id)
    }, [id])

    // List AAS by ID
    const getAas = async (id) => {
        try {
            const res = await axios.get('/api/aas/' + id)
            setAas(res.data)
        } catch {
            setAas({})
        }
    }

    // Update AAS
    const updateAas = async () => {
        // Take the difference between the aas and the editedAas
        const aasChanges = diff(aas, editedAas)

        // Update AAS on the server
         try {
            const res = await axios.patch(`/api/aas/${aas._id}`, aasChanges)
            setAas(res.data)
            setEditedAas(undefined)
        } catch (error) {
            console.log(error)
        }
    }

        // Delete AAS
        const deleteAas = async () => {
            try {
                await axios.delete(`/api/aas/${aas._id}`)
                history.push('/aas')
              
            } catch (error) {
                console.log(error)            
            }
        }

    

   
  



    return (
        <div className="container">

            <nav className="navbar navbar-light bg-light">
    
                <div className="float left">
                    <button 
                        className="btn btn-light"
                        disabled="disabled"
                    >AAS #{aas._id}
                    </button>

                    <button 
                        className={(() => _.isEmpty(editedAas) ? 'btn btn-outline-dark disabled' :  'btn btn-success')()} 
                        disabled={(() => _.isEmpty(editedAas) ? 'disabled' : '')()}
                        onClick={ updateAas }
                    >Apply changes
                    </button>
                </div>
    
                <button 
                    type="button"
                    className="btn btn-danger float-right"
                    onClick={ deleteAas }
                >Delete AAS
                </button>
       
            </nav>

            <br />
    
            <ReactJson 
                src={aas}
                enableClipboard={ false }
                onEdit={ edit => setEditedAas(edit.updated_src) }
                onAdd={ edit => setEditedAas(edit.updated_src) }
                onDelete={ edit => setEditedAas(edit.updated_src) }
            />
            
            <br />
            <Link className="btn btn-outline-primary" to={'/aas'}>AAS List</Link>

        

        </div> 
    )
    
}
export default AasShow
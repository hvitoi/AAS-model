// Packages
import React from 'react'
import { nanoid } from 'nanoid'

// Hooks
import { useState } from 'react'
import { useForm } from 'react-hook-form';


// -------------------------


const AasNew = () => {
    const [inputs, setInputs] = useState(['input0'])
    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    const [values, setValues] = useState({})

    const onSubmit = (data) => {
        console.log(data);
    };

    const addField = () => {
        const newInput = nanoid()
        setInputs([...inputs, newInput])
    }

    const removeField = (input) => {
        const remainingInputs = inputs.filter( el => el !== input )
        setInputs(remainingInputs)
  
    }


    const renderControlButton = (input) => {
        if(input === inputs[inputs.length-1]) {
            return <button type="button" className="btn btn-info" style={{ width: '40px' }} onClick={ addField }><strong>+</strong></button>
        } else {
            return <button type="button" className="btn btn-danger" style={{ width: '40px' }} onClick={ () => removeField(input) }><strong>-</strong></button>
        }
    }

    const renderInputs = () => (
        inputs.map( input => {
            return (
                    <div className="input-group" key={ input }>
                        <div className="input-group-prepend">
                            {/* <input className="input-group-text" placeholder="key" name={input+'key'} /> */}
                            <input className="input-group-text" name={ input } placeholder="key" value={ values[input]} onChange = { (e) => setValues({ ...values, [input]: e.target.value })} />
                        </div>
                        {/* <input type="text" className="form-control" placeholder="value" name={ input+'val' } ref={ register } /> */}
                        <input className="form-control" name= { values[input] } placeholder="value" ref={register} />
                        { renderControlButton(input) }
                    </div>
            )
        }) 
    )


   

    return (
        <div className="container" >
            <nav className="navbar navbar-light bg-light">
                <span className="nav-link active">New AAS</span>
            </nav>
            
            <br />
            
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <input type="text" className="input-group-text" value='namePlate' id="nameplate" disabled/>
                    </div>
                    <input type="text" className="form-control" name="namePlate" ref={register} />
                </div>        

                <div className="input-group">
                    <div className="input-group-prepend">
                        <input type="text" className="input-group-text" value="manufacturer" disabled/>
                    </div>
                    <input type="text" className="form-control" name="manufacturer" ref={register} />
                </div>   

                <div className="input-group">
                    <div className="input-group-prepend">
                        <input type="text" className="input-group-text" value="description" disabled/>
                    </div>
                    <input type="text" className="form-control" name="description" ref={register} />
                </div>   


                <hr />

                { renderInputs() }   

                <br />
                <button type="submit" className="btn btn-success">Create AAS</button>
            </form>

  
        
        </div>
    )
}

export default AasNew
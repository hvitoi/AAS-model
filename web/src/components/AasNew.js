// Packages
import React, { useEffect } from 'react'
import axios from 'axios'

// Hooks
import { useForm, useFieldArray } from 'react-hook-form';

// History
import history from '../history'


// -------------------------


const AasNew = () => {
    const { register, handleSubmit, control } = useForm(); // initialise the hook

    const { fields, append, remove } = useFieldArray({
        control,
        name: "extras"
      });

    useEffect(() => {
        addField()
    }, [append]);

    const onSubmit = async (data) => {
        const newData = {
            ...data,
            ...(data.extras || []).reduce((result, extra) => ({
                ...result,
                [extra.key]: extra.value
            }),{})
        }
        delete newData.extras;
        console.log(newData)

         // Creates AAS
          try {
            const res = await axios.post('/api/aas', newData)
            history.push('/aas/' + res.data._id)
         } catch (error) {
             console.log(error)
         }
    };

    const addField = () => {
        append({ name: "extras" })
    }

    const renderButtons = ( index) => {
            if(fields.length === index+1) return <button type="button" style={{ width: '40px' }} className="btn btn-info"onClick={ addField }><strong>+</strong></button>;
            return <button type="button" className="btn btn-danger" style={{ width: '40px' }} onClick={ () => remove(index) }><strong>-</strong></button>
    }

    const renderInputs = () => (
        fields.map((item, index) => {
            return (
                <div className="input-group" key={ item.id } style={{ margin: '5px' }}>
                    <div className="input-group-prepend" >
                        {/* <input className="input-group-text" placeholder="key" name={input+'key'} /> */}
                        <input className="input-group-text" name={`extras[${index}].key`} placeholder="key" ref={register()} />
                    </div>
                    {/* <input type="text" className="form-control" placeholder="value" name={ input+'val' } ref={ register } /> */}
                    <input className="form-control" name={`extras[${index}].value`}  placeholder="value" ref={register()} />
                    {renderButtons(index)}
                </div>
            )
        }) 
    );

   

    return (
        <div className="container" >
            <nav className="navbar navbar-light bg-light">
                <span className="nav-link active">New AAS</span>
            </nav>
            
            <br />
            
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group" style={{ margin: '5px' }}>
                    <div className="input-group-prepend">
                        <input type="text" className="input-group-text" value='namePlate' id="nameplate" disabled/>
                    </div>
                    <input type="text" className="form-control" name="namePlate" ref={register} />
                </div>        

                <div className="input-group" style={{ margin: '5px' }}>
                    <div className="input-group-prepend">
                        <input type="text" className="input-group-text" value="manufacturer" disabled/>
                    </div>
                    <input type="text" className="form-control" name="manufacturer" ref={register} />
                </div>   

                <div className="input-group" style={{ margin: '5px' }}>
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
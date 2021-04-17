import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import {toast} from 'react-toastify'

const AddContact = (props) => {

    const initialStateValues = {
        name: '',
        lastname: '',
        phone: ''
    }

    const [values, setValues] = useState(initialStateValues);

    const validaPhone = (phone) =>{
        var phoneNumberPattern = /^\d+$/;
        return phoneNumberPattern.test(phone); 
    }


    const manejoCambioInputs = e => {
        const { name, value } = e.target; // quiero de e.target el nombre y el valor que estamos escribiendo en el input
        setValues({ ...values, [name]: value })// con los ... le digo que copie los valores que ya tenga escrito el input con aterioridad y despues que altere el input identificado con name con los valores que tiene en su value
        //console.log(e.target.value) // e.target.input sirve para recojer lo que estamos escribiendo en el input
    }

    const manejoEnvio = e => {
        e.preventDefault();//sirve para cancelar el comportamiento por defecto
        if (!validaPhone(values.phone)){
            return  toast('Formato de telefono invalido!', {
                type: 'warning',
                autoClose: 1000,
            })
        }
        props.addOrEditContact(values);
        setValues({...initialStateValues})
    }

    const getContactById = async (id) => {
        const doc = await db.collection('contacts').doc(id).get();
        setValues({...doc.data()})
    }
    
    useEffect( () =>{
        if(props.idActual === ''){
            setValues({ ...initialStateValues});
        } else{
            getContactById(props.idActual)
        }
    }, [props.idActual]);
  
    return (
        <form className="card card-body" onSubmit={manejoEnvio}>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">account_box</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="name"
                    onChange={manejoCambioInputs}
                    value={values.name}
                />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">account_box</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    name="lastname"
                    onChange={manejoCambioInputs}
                    value={values.lastname}
                />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">call</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Telefono"
                    name="phone"
                    onChange={manejoCambioInputs}
                    value={values.phone}
                />

                <button className="btn btn-primary btn-block">
                    Guardar
                </button>
            </div>

        </form>
    )
}

export default AddContact;
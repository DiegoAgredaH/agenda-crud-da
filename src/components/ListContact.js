import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Modal } from '@material-ui/core'
import { toast } from 'react-toastify'
import AddContact from './AddContact'



const ListContact = () => {

    //sirve para que cada ves que el getContacts me traiga datos voy a llenar el arreglo.
    const [contacts, setContacts] = useState([]);

    //sirve para poder realizar la accion de editar
    const [idActual, setIdActual] = useState('');

    const [modal, setModal] = useState(false);

    const abrirCerrarModal = (id) => {
        setModal(!modal);
        setIdActual(id);
    }

    const addOrEditContact = async (contactObject) => {
        if (idActual === '') {
            await db.collection('contacts').doc().set(contactObject)
            toast('¡Contacto nuevo agregado!', {
                type: 'success',
                autoClose: 1000,
            });
        } else {
            await db.collection('contacts').doc(idActual).update(contactObject)
            toast('¡Contacto editado!', {
                type: 'info',
                autoClose: 1000,
            });
            abrirCerrarModal();
        }
    };

    //creamos el contenido de la ventana modal para editar
    const body = (
        <div className="modal-open">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Contacto</h5>
                        <button onClick={abrirCerrarModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <AddContact {...{ addOrEditContact, idActual, contacts}} />
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
        </div>
    )



    /*la funcion getContacts va a realizar una peticion a firebase */
    const getContacts = async () => {
        // el onSnapshot recibe una funcion como parametro la cual se va a ejecutar
        // cada vez que los datos cambien
        db.collection('contacts').onSnapshot((querySnapshot) => {

            //docs nos sirve para unir todo lo que tenga ...doc.data y el doc.id
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setContacts(docs);
        });
    };

    //esta funcion sirve para eliminar un contacto
    const onDeleteContact = async (id) => {
        if (window.confirm('Esta seguro de eliminar este contacto?')) {
            await db.collection('contacts').doc(id).delete();
            toast('Contacto eliminado satisfactoriamente', {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    /* Utilizamos el useeffect para realizar la solicitud a firebase,
    como primer parametro tiene una funcion y como segundo un array*/
    useEffect(() => {
        getContacts();
    }, []);    

    return (
        <div className="container-fluid">
            <div className="table-responsive">
                <table className=" table table-striped table-bordered table-hover">
                    <thead >
                        <tr className="table-warning">
                            <th >Nombre</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody >
                        {contacts.map((contact) => {
                            return (
                                //el key sirve para poder hacer que la tabla sea dinamica
                                <tr key={contact.id} className="table-secondary">
                                    
                                    <td>{contact.name}</td>
                                    <td>{contact.lastname}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <IconButton
                                            onClick={
                                                () => onDeleteContact(contact.id)
                                            }
                                            color="secondary"
                                            aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>

                                        <IconButton
                                            onClick={() => abrirCerrarModal(contact.id)}
                                            color="primary"
                                            aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <Modal
                                            open={modal}
                                            onClose={abrirCerrarModal}>
                                            {body}
                                        </Modal>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    )

}

export default ListContact;
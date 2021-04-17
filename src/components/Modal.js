import React from 'react'
import AddContact from './AddContact'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { Modal} from '@material-ui/core'

const Modal1 = ({ isOpen, closeModal }) => {

    /*con esta funcion podemos guardar el objeto en firebase
    await db.collection('contacts').doc().set(contactObject)
    significa que desde la base de datos de firebase vamos a crear una colleccion 
    o un conjunto de datos llamados contacts y dentro de ellos voy a guardar un documento nuevo
    .doc le va a generar un id unico y con .set voy a guardar los datos que tiene contactObject
    esa funcion es un evento asincrono por eso va el wait y async*/
    const addOrEditContact = async (contactObject) => {
        await db.collection('contacts').doc().set(contactObject)
        toast('¡Contacto nuevo agregado!', {
            type: 'success',
            autoClose: 1000,
        });
        closeModal();
    }

    const body = (
        <div className="modal-open">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Nuevo Contacto</h5>
                        <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <AddContact addOrEditContact={addOrEditContact} />
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}>
            {body}
        </Modal>
    )
}

export default Modal1

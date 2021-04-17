import React from 'react';
import ContactsIcon from '@material-ui/icons/Contacts';


const Header = () => {
    return (
        <ul class="breadcrumb">
            <li  class="active"><a  href="/"><ContactsIcon/> Agenda de contactos</a></li>
        </ul>
    );
}

export default Header;
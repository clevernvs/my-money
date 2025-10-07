import React from 'react';
import MenuItem from './menuItem';
import MenuTree from './menuTree';

export default (props) => {

    <ul className="sidebar-menu">
        <MenuItem label='Dashboard' icon='dashboard' path='#/'></MenuItem>
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem label='Ciclos de pagamento' icon='usd' path='#billingCycles'></MenuItem>
        </MenuTree>

    </ul>
  
}
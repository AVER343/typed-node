import React from "react"
import BellIcon from '../../icons/bell.svg';
import MessengerIcon from '../../icons/messenger.svg';
import CaretIcon from '../../icons/caret.svg';
import PlusIcon from '../../icons/plus.svg';
import CogIcon from '../../icons/cog.svg';
import ChevronIcon from '../../icons/chevron.svg';
import ArrowIcon from '../../icons/arrow.svg';
import BoltIcon from '../../icons/bolt.svg';
import { DropdownItem } from "../dropDownMenu"
import { MenuData } from "../MenuData";
const RegisterMenu=(props:any)=>{
    return <div className="menu">
    <DropdownItem setActiveMenu={props.setActiveMenu} 
                  goToMenu="main" 
                  leftIcon={<ArrowIcon />}>
      <h2>Animals</h2>
    </DropdownItem>
    {MenuData['register'].map((e,i)=><DropdownItem key={i}
                                     setActiveMenu={props.setActiveMenu} 
                                     {...e}>{e.name}</DropdownItem>)}
    </div>
}
export default RegisterMenu
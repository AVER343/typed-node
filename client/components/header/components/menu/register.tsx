import React from "react"
const ArrowIcon = require('../../icons/arrow.svg') 
import styles from '../../header.module.css'
import { DropdownItem } from "../dropDownMenu"
import { MenuData, MenuTitles_ENUM, menu_representation } from "../MenuData";
const RegisterMenu=(props:any)=>{
    return <div className={styles["menu"]}>
    <DropdownItem setActiveMenu={props.setActiveMenu} 
                  goToMenu="main" 
                  leftIcon={<ArrowIcon/>}>
  <h2>{menu_representation.filter(e=>e.goToMenu==MenuTitles_ENUM.REGISTER)['0']['name']}</h2>
    </DropdownItem>
    {MenuData['register'].map((e,i)=><DropdownItem key={i}
                                     setActiveMenu={props.setActiveMenu} 
                                     {...e}>{e.name}</DropdownItem>)}
    </div>
}
export default RegisterMenu
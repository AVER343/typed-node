import React from "react"
import { DropdownItem } from "../dropDownMenu"
import styles from '../../header.module.css'
import {  menu_representation } from "../MenuData";
const MainMenu=(props:any)=>{
    const hasKey=(obj:any,key:any)=>obj && obj[key]
    return <div className={styles["menu"]}>
            { menu_representation.map((
                (e,i)=><DropdownItem 
                        index={i}
                        isHeader={i==0?true:false}
                        setActiveMenu={props.setActiveMenu}
                        goToMenu={menu_representation[i]['goToMenu']}
                        key={i}>
                          {menu_representation[i]['goToMenu'].charAt(0).toUpperCase() + menu_representation[i]['goToMenu'].slice(1)}
                        </DropdownItem>))}
            </div>
}
export default MainMenu
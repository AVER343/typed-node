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
import styles from '../../header.module.css'
import {  MenuTitles_ENUM, menu_representation } from "../MenuData";
const MainMenu=(props:any)=>{
    const hasKey=(obj:any,key:any)=>obj && obj[key]
    return <div className={styles["menu"]}>
            { menu_representation.map((
                (e,i)=><DropdownItem 
                        setActiveMenu={props.setActiveMenu}
                        goToMenu={menu_representation[i]['goToMenu']}
                        key={i}>
                            {menu_representation[i]['goToMenu'].charAt(0).toUpperCase() 
                            + menu_representation[i]['goToMenu'].slice(1)}
                        </DropdownItem>))}
            </div>
}
export default MainMenu
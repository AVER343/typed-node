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
const MainMenu=(props:any)=>{
    return <div className="menu">
            <DropdownItem setActiveMenu={props.setActiveMenu}>My Profile</DropdownItem>
            <DropdownItem
                leftIcon={<CogIcon />}
                rightIcon={<ChevronIcon />}
                setActiveMenu={props.setActiveMenu}
                goToMenu="settings">
              Settings
            </DropdownItem>
            <DropdownItem
                leftIcon="🦧"
                rightIcon={<ChevronIcon />}
                setActiveMenu={props.setActiveMenu}
                goToMenu="animals">
              Animals
            </DropdownItem>
        </div>
}
export default MainMenu
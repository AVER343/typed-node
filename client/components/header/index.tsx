import BellIcon from './icons/bell.svg';
import MessengerIcon from './icons/messenger.svg';
import CaretIcon from './icons/caret.svg';
import PlusIcon from './icons/plus.svg';
import CogIcon from './icons/cog.svg';
import ChevronIcon from './icons/chevron.svg';
import ArrowIcon from './icons/arrow.svg';
import BoltIcon from './icons/bolt.svg';
import DropdownMenu from './components/dropDownMenu'
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './header.module.css'
function HeaderComponent() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />}  />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className={styles["navbar"]}>
      <ul className={styles["navbar-nav"]}>{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles["nav-item"]}>
      <a href="#" className={styles["icon-button"]} onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}


export default HeaderComponent;
import { register } from "ts-node";

export enum MenuTitles_ENUM{
    MENU='menu',
    SETTINGS='settings',
    REGISTER='register'
}
let MenuData:{[id in MenuTitles_ENUM]:[]}={
    menu:[],
    settings:[],
    register:[]
}
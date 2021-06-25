import { register } from "ts-node";

export enum MenuTitles_ENUM{
    MAIN='main',
    SETTINGS='settings',
    REGISTER='register'
}
interface menu_props{
    leftIcon?:any,
    rightIcon?:any,
    gotToMenu?:MenuTitles_ENUM
    name:string
}
export let MenuData:{[id in MenuTitles_ENUM]:menu_props[]}={
    main:[{
        leftIcon:'asdasd',
        gotToMenu:MenuTitles_ENUM.REGISTER,
        name:'REGISTER'
    }],
    settings:[],
    register:[]
}

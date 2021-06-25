export enum MenuTitles_ENUM{
    MAIN='main',
    SETTINGS='settings',
    REGISTER='register'
}
interface menu_props{
    leftIcon?:any,
    rightIcon?:any,
    goToMenu?:MenuTitles_ENUM
    name:string
}
export let MenuData:{[id in MenuTitles_ENUM]:menu_props[]}={
    main:[{
        leftIcon:'asdasd',
        goToMenu:MenuTitles_ENUM.REGISTER,
        name:'REGISTER'
    },{
        leftIcon:'asdasd',
        goToMenu:MenuTitles_ENUM.SETTINGS,
        name:'SETTINGS'
    }],
    register:[{
        leftIcon:'asdasd',
        goToMenu:MenuTitles_ENUM.MAIN,
        name:'MAIN'
    },{
        leftIcon:'asdasd',
        goToMenu:MenuTitles_ENUM.SETTINGS,
        name:'SETTINGS'
    }],
    settings:[{
        leftIcon:'asdasd',
        goToMenu:MenuTitles_ENUM.REGISTER,
        name:'REGISTER'
    },{
        leftIcon:'asdasd',
        goToMenu:MenuTitles_ENUM.MAIN,
        name:'MAIN'
    }]
}
interface main_menu_props extends menu_props{
    goToMenu:string;
}
export let menu_representation:main_menu_props[]=[
    {
        goToMenu:MenuTitles_ENUM.MAIN,
        name:'main'
    },
    {
        goToMenu:MenuTitles_ENUM.REGISTER,
        name:'register'
    },
    {
        goToMenu:MenuTitles_ENUM.SETTINGS,
        name:'settings'
    }
]
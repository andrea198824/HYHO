import React from "react";
import { icons } from "./icons";
const { home, add, person } = icons;

    export const SidebarData = [
        {
            title: 'Home',
            path: '/home',
            icon: home,
            cName: 'nav-text'
        },
        {
            title: 'Add new breed',
            path: '/newbreed',
            icon: add,
            cName: 'nav-text'
        },
        // {
        //     title: 'Contact',
        //     path: '/contact',
        //     icon: person,
        //     cName: 'nav-text'
        // },
    ]

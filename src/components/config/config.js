
import Restaurant from "../app/restaurants/restaurants";
import RestaurantAdmin from "../app/backoffice/parentComponent/restaurant";
import MenuAdmin from "../app/backoffice/parentComponent/menu";
import CarteAdmin from "../app/backoffice/parentComponent/carte";
import Plats from "../app/plats/plats";
import NosMenus from "../app/menu/nosMenus";
import Authentification from "../app/utilisateurs/authentification";
import Profile from "../app/utilisateurs/profile"
import Login from "../app/backoffice/login/login";
import MenuList from "../app/backoffice/list/menuList";
const Config = {
    URL: "https://firebasestorage.googleapis.com/v0/b/mbds-2685c.appspot.com/o/",
    URL_IMAGE: "https://firebasestorage.googleapis.com/v0/b/mbds-2685c.appspot.com/o/restaurants%2F",
    URL_IMAGE_PLAT: "https://firebasestorage.googleapis.com/v0/b/mbds-2685c.appspot.com/o/plats%2F",
    URS_TOKEN: "?alt=media&token=3e54a86e-51e7-4e54-982b-b75e190fe626",
    routesClient: [

        {
            path: "/restaurants",
            component: Restaurant,
            text: "LISTES DES RESTAURANTS",
        },
        {
            path: "/plats",
            component: Plats,
            text: "NOS PLATS",
        },
        {
            path: "/nos-menus",
            component: NosMenus,
            text: "NOS MENUS",
        },
        {
            path: "/se-connecter",
            component: Authentification,
            text: "SE CONNECTER",
            key: "Authentification"
        }

    ],
    routeUser:{
        path: "/profile",
        component: Profile,
    },
    routeLogin: {
        path: "/bo",
        component: Login,
    },
    routesAdmin: [
        {
            path: "/bo/restaurant/list",
            component: RestaurantAdmin,
            text: "RESTAURANTS",
            icon : "fas fa-hotel",
            key : "restaurant-list"
        },
        {
            path: "/bo/menu/list",
            component: MenuAdmin,
            text: "MENUS",
            icon : "fa fa-apple-alt",
            key : "menu-list"
        },{
            path: "/bo/carte/list",
            component: CarteAdmin,
            text: "CARTES",
            icon : "fas fa-scroll",
            key : "carte-list"
        }
        /*,
        {
            path: "/bo/menu/list",
            component: MenuAdmin,
            text: "PLATS",
            icon : "fas fa-utensils",
            key : "menu-list"
        }
        ,
        {
            path: "/bo/menu/list",
            component: MenuList,
            text: "CARTES",
            icon : "fas fa-scroll",
            key : "menu-list"
        },
        {
            path: "/bo/menu/list",
            component: MenuList,
            text: "UTILISATEURS",
            icon : "fas fa-users    ",
            key : "menu-list"
        }*/
    ],
    titrePlats: ["Nos entrées", "Nos plats", "Nos desserts", "No boissons"],
    titrePlatsAdmin: ["E", "P", "D", "B"],
    titreMenu: ["Entrée", "Le plat", "Le dessers", "La boisson"],
    platsKey: ["entree", "plats", "desserts", "boissons"],
    restauranTableHead : ["Nom","Description","Adresse","Télephone","Type de cuisine"],
    menuTableHead : ["Restaurant","Menus","Date de création"],
    carteTableHead : ["Restaurant","Cartes"],
    idPlats : ["idEntree", "idPlats","idDesserts","idBoissons"]
}

export default Config;
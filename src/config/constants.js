import { AiFillHeart } from "react-icons/ai"; 
import { TbCategory } from "react-icons/tb"; 
import { RiTvFill } from "react-icons/ri"; 
import { CiSearch } from "react-icons/ci"; 
import { MdHome } from "react-icons/md"; 
export const buttons = [
    {id: 1, title: "Home", path: "/", icon: MdHome},
    {id: 2, title: "Search", path: "/search", icon: CiSearch},
    {id: 3, title: "Categories", path: "/categories", icon: TbCategory},
    {id: 4, title: "Favourite", path: "/favourite", icon: AiFillHeart},
]
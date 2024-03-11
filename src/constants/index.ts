import { INavLink } from "@/types";
import { Routes } from "../../Routes";
import { MdOutlineExplore } from "react-icons/md";
import { RiHome6Line, RiImageAddLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";

export const sidebarLinks: INavLink[] = [
  {
    icon: RiHome6Line,
    route: Routes.Home,
    label: "Home",
  },
  {
    icon: MdOutlineExplore,
    route: Routes.Explore,
    label: "Explore",
  },
  {
    icon: GoPeople,
    route: Routes.Peoples,
    label: "People",
  },
  {
    icon: FaRegBookmark,
    route: Routes.Saved,
    label: "Saved",
  },
  {
    icon: RiImageAddLine,
    route: Routes.CreatePost,
    label: "Create Post",
  },
];

export const bottombarLinks: INavLink[] = [
  {
    icon: RiHome6Line,
    route: Routes.Home,
    label: "Home",
  },
  {
    icon: MdOutlineExplore,
    route: Routes.Explore,
    label: "Explore",
  },
  {
    icon: GoPeople,
    route: Routes.Peoples,
    label: "People",
  },
  {
    icon: FaRegBookmark,
    route: Routes.Saved,
    label: "Saved",
  },
];

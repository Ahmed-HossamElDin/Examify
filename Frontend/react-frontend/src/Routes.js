import Placeholder from "./views/placeholder.js";

// @material-ui/icons

import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

var dashRoutes = [
  {
    path: "/Placeholder",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Placeholder,
    layout: "/admin"
  },
  {
    path: "/create-exam",
    name: "Add exam",
    rtlName: "اضف امتحان",
    icon: AddCircleOutlineSharpIcon,
    component: Placeholder,
    layout: "/admin"
  },
  {
    path: "/edit-exam",
    name: "Edit exam",
    rtlName: "عدل امتحان",
    icon: EditOutlinedIcon,
    component: Placeholder,
    layout: "/admin"
  },
];
export default dashRoutes;

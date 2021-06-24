import Placeholder from "../views/placeholder.js";

import DashboardIcon from "@material-ui/icons/Dashboard";

var StudentRoutes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Placeholder,
    layout: "/dashboard",
  },
];
export default StudentRoutes;

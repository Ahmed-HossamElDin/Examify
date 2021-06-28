import Placeholder from "../views/placeholder.js";
import SupervisorExamList from "../views/SupervisorExamList.js";

import DashboardIcon from "@material-ui/icons/Dashboard";

var SupervisorRoutes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: SupervisorExamList,
    layout: "/dashboard",
  },
];
export default SupervisorRoutes;

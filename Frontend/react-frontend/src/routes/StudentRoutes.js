import DashboardIcon from "@material-ui/icons/Dashboard";
import StudentExamList from "../views/StudentExamList.js";

var StudentRoutes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: StudentExamList,
    layout: "/dashboard",
  },
];
export default StudentRoutes;

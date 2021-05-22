import Placeholder from "./views/placeholder.js";
import CreateExam from "./views/CreateExam.js";
import EditExam from "./views/EditExam.js";
import ViewExam from "./views/ViewExams.js"
// @material-ui/icons

import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ViewHeadlineOutlinedIcon from '@material-ui/icons/ViewHeadlineOutlined';

var dashRoutes = [
  {
    path: "/dashboard",
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
    component: CreateExam,
    layout: "/admin"
  },
  {
    path: "/edit-exam",
    name: "Edit exam",
    rtlName: "عدل امتحان",
    icon: EditOutlinedIcon,
    component: EditExam,
    layout: "/admin"
  },
  {
    path: "/view-exam",
    name: "View exam",
    rtlName: "عرض امتحان",
    icon: ViewHeadlineOutlinedIcon,
    component: ViewExam,
    layout: "/admin"
  },
];
export default dashRoutes;

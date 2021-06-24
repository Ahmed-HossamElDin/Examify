import Placeholder from "../views/placeholder.js";
import CreateExam from "../views/CreateExam.js";
import EditExam from "../views/EditExam.js";
import ViewExam from "../views/ViewExams.js"

import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ViewHeadlineOutlinedIcon from '@material-ui/icons/ViewHeadlineOutlined';

var ExaminerRoutes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Placeholder,
    layout: "/dashboard"
  },
  {
    path: "/create-exam",
    name: "Add exam",
    rtlName: "اضف امتحان",
    icon: AddCircleOutlineSharpIcon,
    component: CreateExam,
    layout: "/dashboard"
  },
  {
    path: "/edit-exam",
    name: "Edit exam",
    rtlName: "عدل امتحان",
    icon: EditOutlinedIcon,
    component: EditExam,
    layout: "/dashboard"
  },
  {
    path: "/view-exam",
    name: "View exam",
    rtlName: "عرض امتحان",
    icon: ViewHeadlineOutlinedIcon,
    component: ViewExam,
    layout: "/dashboard"
  },
];
export default ExaminerRoutes;

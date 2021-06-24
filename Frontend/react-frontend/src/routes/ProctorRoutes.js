import Placeholder from "../views/placeholder.js";
import CreateExam from "../views/CreateExam.js";
import EditExam from "../views/EditExam.js";
import ViewExam from "../views/ViewExams.js"

import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ViewHeadlineOutlinedIcon from '@material-ui/icons/ViewHeadlineOutlined';

var ProctorRoutes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Placeholder,
    layout: "/dashboard"
  },
];
export default ProctorRoutes;

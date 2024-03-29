import CreateExam from "../views/CreateExam.js";
import ListExams from "../views/ListExams.js";
import ViewListOfExams from "../views/ViewListOfExams.js";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleOutlineSharpIcon from "@material-ui/icons/AddCircleOutlineSharp";
import ViewHeadlineOutlinedIcon from "@material-ui/icons/ViewHeadlineOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExaminerHomePage from "../views/ExaminerHomePage.js";
var ExaminerRoutes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: ExaminerHomePage,
    layout: "/dashboard",
  },
  {
    path: "/create-exam",
    name: "Create a new exam",
    rtlName: "اضف امتحان",
    icon: AddCircleOutlineSharpIcon,
    component: CreateExam,
    layout: "/dashboard",
  },
  {
    path: "/view-exam",
    name: "View exams",
    rtlName: "عرض امتحان",
    icon: ViewHeadlineOutlinedIcon,
    component: ListExams,
    layout: "/dashboard",
  },
  {
    path: "/view-student-exam",
    name: "View Students exams",
    rtlName: "عرض امتحان",
    icon: VisibilityIcon,
    component: ViewListOfExams,
    layout: "/dashboard",
  },
];
export default ExaminerRoutes;

import React from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

// core components
import Sidebar from "../components/Sidebar.js";

import ExaminerRoutes from "../routes/ExaminerRoutes.js";

import StudentRoutes from "../routes/StudentRoutes.js";

import SupervisorRoutes from "../routes/SupervisorRoutes.js";

import styles from "../js/adminStyle.js";

var ps;

var routes;

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const { ...rest } = props;
  const [username, setUsername] = React.useState("");
  const [userType, setUserType] = React.useState(0);

  React.useEffect(() => {
    setUsername(localStorage.getItem("ExamifyUsername"));
    setUserType(localStorage.getItem("ExamifyUserType"));
  });
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(true);
  // const [image, setImage] = React.useState(require("assets/img/sidebar-2.jpg"));
  const [color, setColor] = React.useState("blue");
  const [bgColor, setBgColor] = React.useState("white");
  // const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [logo, setLogo] = React.useState(
    require("../images/examify-logo.png").default
  );
  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1,
    });
  //routes
  switch (parseInt(userType)) {
    case 2:
      routes = ExaminerRoutes;
      break;
    case 1:
      routes = StudentRoutes;
      break;
    case 3:
      routes = SupervisorRoutes;
      break;
    default:
      routes = ExaminerRoutes;
  }
  // ref for main panel div
  const mainPanel = React.createRef();
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });
  // functions for changing the states from components
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/dashboard/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Examify";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/dashboard") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  return (
    <div>
      {localStorage.getItem("ExamifyToken") !== null ? (
        <div className={classes.wrapper}>
          <Sidebar
            routes={routes}
            logoText={"Examify"}
            logo={logo}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color={color}
            bgColor={bgColor}
            miniActive={miniActive}
            username={username}
            {...rest}
          />
          <div className={mainPanelClasses} ref={mainPanel}>
            {getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>
                  <Switch>
                    {getRoutes(routes)}
                    <Redirect from="/dashboard" to="/dashboard/home" />
                  </Switch>
                </div>
              </div>
            ) : (
              <div className={classes.map}>
                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="/dashboard" to="/dashboard/home" />
                </Switch>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <LinearProgress />
          <Redirect to="/" />
        </div>
      )}
    </div>
  );
}

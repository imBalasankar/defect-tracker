import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BugReportIcon from "@material-ui/icons/BugReport";
import AddProject from "./AddProject";
import ModifyProject from "./ModifyProject";
import AddDefect from "./AddDefect";
import ModifyDefect from "./ModifyDefect";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function LeftDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [projectOpen, setProjectOpen] = React.useState(false);
  const [defectOpen, setDefectOpen] = React.useState(false);
  const [addProjectShow, setAddProjectShow] = React.useState(false);
  const [modifyProjectsShow, setModifyProjectsShow] = React.useState(false);
  const [addDefectShow, setAddDefectShow] = React.useState(false);
  const [modifyDefectsShow, setModifyDefectsShow] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleProjectClick = () => {
    if (defectOpen) {
      setDefectOpen(false);
    }
    setProjectOpen(!projectOpen);
  };

  const handleDefectClick = () => {
    if (projectOpen) {
      setProjectOpen(false);
    }
    setDefectOpen(!defectOpen);
  };

  const handleAddProjectClick = () => {
    setModifyProjectsShow(false);
    setModifyDefectsShow(false);
    setAddDefectShow(false);
    setAddProjectShow(true);
  };

  const handlemodifyProjectsClick = () => {
    setAddProjectShow(false);
    setAddDefectShow(false);
    setModifyDefectsShow(false);
    setModifyProjectsShow(true);
  };

  const handleAddDefectClick = () => {
    setModifyProjectsShow(false);
    setModifyDefectsShow(false);
    setAddProjectShow(false);
    setAddDefectShow(true);
  };

  const handlemodifyDefectsClick = () => {
    setAddProjectShow(false);
    setAddDefectShow(false);
    setModifyProjectsShow(false);
    setModifyDefectsShow(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerOpen
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Defect Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={handleProjectClick}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Project" />
            {projectOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={projectOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={handleAddProjectClick}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Project" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={handlemodifyProjectsClick}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Modify Projects" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleDefectClick}>
            <ListItemIcon>
              <BugReportIcon />
            </ListItemIcon>
            <ListItemText primary="Defect" />
            {defectOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={defectOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={handleAddDefectClick}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Defect" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={handlemodifyDefectsClick}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Modify Defects" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {addProjectShow ? <AddProject /> : null}
        {modifyProjectsShow ? <ModifyProject /> : null}
        {addDefectShow ? <AddDefect /> : null}
        {modifyDefectsShow ? <ModifyDefect /> : null}
      </main>
    </div>
  );
}

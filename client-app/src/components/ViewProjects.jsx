import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

const divStyle = {
  marginTop: "10px"
};

export default function ViewProjects(props) {
  const classes = useStyles();
  const [projects, setProject] = React.useState([]);
  const [showResult, setShowResult] = React.useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    Axios.get("http://localhost:8087/dt/api/v1/project")
      .then(response => {
        console.log(response);
        setProject(response.data);
      })
      .catch(error => {
        console.log(error);
        setShowResult("alert alert-danger");
        setMessage("Failed to Retrieve Data!!");
      });
  }, [props.value]);

  return (
    <div>
      <div style={divStyle} className={showResult} role="alert">
        {message}
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Project Id</StyledTableCell>
              <StyledTableCell align="right">Project Name</StyledTableCell>
              <StyledTableCell align="right">
                Project Description
              </StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.projectId}>
                <TableCell>{project.projectId}</TableCell>
                <TableCell align="right">{project.projectName}</TableCell>
                <TableCell align="right">
                  {project.projectDescription}
                </TableCell>
                <TableCell align="right">
                  <Fab
                    color="secondary"
                    aria-label="edit"
                    className={classes.fab}
                    size="small"
                    onClick={() => props.onUpdate(project)}
                  >
                    <EditIcon />
                  </Fab>
                </TableCell>
                <TableCell align="right">
                  <Fab
                    color="default"
                    aria-label="delete"
                    className={classes.fab}
                    size="small"
                    onClick={() => props.onDelete(project.projectId)}
                  >
                    <DeleteIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

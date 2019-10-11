import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  container: {
    display: "block",
    marginTop: theme.spacing(5)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(3)
  }
}));

const divStyle = {
  marginRight: "70px",
  marginLeft: "70px",
  marginTop: "30px"
};

export default function AddProject() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    projectId: "",
    projectName: "",
    projectDescription: ""
  });
  const [showResult, setShowResult] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    Axios.post(`http://localhost:8087/dt/api/v1/project`, values)
      .then(response => {
        console.log(response);
        setShowResult("alert alert-success");
        setMessage("Successfully Saved!!");
      })
      .catch(error => {
        console.log(error);
        setShowResult("alert alert-danger");
        setMessage("Failed to Save!!");
      });
  };

  return (
    <div>
      <div style={divStyle} className={showResult} role="alert">
        {message}
      </div>
      <form
        className={classes.container}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="project-id"
          label="Project Id"
          className={classes.textField}
          value={values.projectId}
          onChange={handleChange("projectId")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="project-name"
          label="Project Name"
          className={classes.textField}
          value={values.projectName}
          onChange={handleChange("projectName")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="project-desc"
          label="Project Description"
          className={classes.textField}
          value={values.projectDescription}
          onChange={handleChange("projectDescription")}
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          endIcon={<SaveIcon />}
        >
          Save
        </Button>
      </form>
    </div>
  );
}

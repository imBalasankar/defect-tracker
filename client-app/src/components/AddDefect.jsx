import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const divStyle = {
  marginRight: "70px",
  marginLeft: "70px",
  marginTop: "30px"
};

export default function AddDefect() {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [values, setValues] = React.useState({
    defectId: "",
    defectName: "",
    defectDescription: "",
    severityChoices: "",
    priorityChoices: "",
    status: "",
    projectId: ""
  });

  const [showResult, setShowResult] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [projects] = React.useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8087/dt/api/v1/project")
      .then(response => {
        console.log(response);
        response.data.map(res => projects.push(res.projectId));
        console.log(projects);
      })
      .catch(error => {
        console.log(error);
        setShowResult("alert alert-danger");
        setMessage("Failed to Retrieve Data for Project Id!!");
      });
  }, [projects]);

  const getProjectId = () => {
    let arr = projects;
    console.log(arr);
    let rows = [];
    for (let i = 0; i < arr.length; i++) {
      rows.push(
        <MenuItem value={arr[i]} key={i}>
          {arr[i]}
        </MenuItem>
      );
    }
    return rows;
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    Axios.post(
      `http://localhost:8087/dt/api/v1/defect/${values.projectId}`,
      values
    )
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
          id="defect-id"
          label="Defect Id"
          className={classes.textField}
          value={values.defectId}
          onChange={handleChange("defectId")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="defect-name"
          label="Defect Name"
          className={classes.textField}
          value={values.defectName}
          onChange={handleChange("defectName")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="defect-desc"
          label="Defect Description"
          className={classes.textField}
          value={values.defectDescription}
          onChange={handleChange("defectDescription")}
          margin="normal"
          variant="outlined"
        />
        <div>
          <FormControl
            required
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel ref={inputLabel} htmlFor="defect-severity">
              Severity
            </InputLabel>
            <Select
              value={values.severityChoices}
              onChange={handleChange("severityChoices")}
              labelWidth={labelWidth}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            required
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel ref={inputLabel} htmlFor="defect-priority">
              Priority
            </InputLabel>
            <Select
              value={values.priorityChoices}
              onChange={handleChange("priorityChoices")}
              labelWidth={labelWidth}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            required
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel ref={inputLabel} htmlFor="defect-status">
              Status
            </InputLabel>
            <Select
              value={values.status}
              onChange={handleChange("status")}
              labelWidth={labelWidth}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Fixed">Fixed</MenuItem>
              <MenuItem value="Re-Open">Re-Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            required
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel ref={inputLabel} htmlFor="project-id">
              Project Id
            </InputLabel>
            <Select
              value={values.projectId}
              onChange={handleChange("projectId")}
              labelWidth={labelWidth}
            >
              {getProjectId()}
            </Select>
          </FormControl>
        </div>
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

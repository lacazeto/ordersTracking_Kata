import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    margin: 0,
    height: `50vh`,
  },
  button: {
    marginTop: 20,
  },
}));

const NotFound = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <Typography variant="h4">404</Typography>
        <Typography variant="subtitle1">Page not found</Typography>
        <Button color="secondary" aria-label="home" href="/" className={classes.button}>
          Return to Home Page
        </Button>
      </div>
    </Paper>
  );
};

export default NotFound;

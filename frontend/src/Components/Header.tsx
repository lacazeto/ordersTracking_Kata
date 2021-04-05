import React from "react";
import { useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  header: {
    height: "10vH",
  },
}));

const Header = (): React.ReactElement => {
  const classes = useStyles();
  let location = useLocation();

  return (
    <Box p={3} className={classes.header}>
      {location.pathname !== "/" && <Link to="/">Return Home</Link>}
    </Box>
  );
};

export default Header;

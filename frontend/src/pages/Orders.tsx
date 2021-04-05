import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import React from "react";

const Orders = (): React.ReactElement => {
  return (
    <Paper>
      <Button color="secondary" aria-label="home" href="/">
        Return to Home Page
      </Button>
    </Paper>
  );
};

export default Orders;

import React from "react";
import { TextField, Paper, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { OrderTracking, LatestCheckPoints } from "@order-management-kata/backend/src/types/index";
import { fetchOrdersData } from "../api";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    "& .MuiTextField-root": {
      margin: `${theme.spacing(3)}px 0`,
      width: "100%",
    },
  },
  button: {
    width: "100%",
    height: "48px",
  },
}));

export default function Home(): React.ReactElement {
  const classes = useStyles();
  const [email, setEmail] = React.useState<string | null>(null);
  const [orders, setOrders] = React.useState<OrderTracking[] | null>(null);
  const [checkpoints, setCheckpoints] = React.useState<LatestCheckPoints | null>(null);

  const fetchOrders = async (): Promise<React.ReactElement | void> => {
    if (!email) return;

    try {
      const [orders, checkpoints] = await fetchOrdersData(email);
      console.log(orders, checkpoints);

      setOrders(orders);
      setCheckpoints(checkpoints);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Paper elevation={3}>
        <Box px={5} py={3} display="flex" alignItems="center" flexDirection="column">
          <Typography variant="h6" align="left">
            Please enter your email address to see your recent orders
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              label="Email"
              defaultValue=""
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
          </form>
          <Button className={classes.button} variant="contained" color="primary" onClick={fetchOrders}>
            Send
          </Button>
        </Box>
      </Paper>

      {orders && orders.length === 0 && (
        <Box my={4}>
          <Typography variant="h4" align="center">
            No orders found! {checkpoints}
          </Typography>
        </Box>
      )}
    </>
  );
}

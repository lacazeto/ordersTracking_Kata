import React from "react";
import { TextField, Paper, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchOrdersData } from "../api";
import { orderDataContext } from "../context";
import { Redirect } from "react-router-dom";

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
  const { orders, setOrders, setCheckpoints } = React.useContext(orderDataContext);
  const [redirect, setRedirect] = React.useState<boolean>(false);

  const fetchOrders = async (): Promise<React.ReactElement | void> => {
    if (!email) return;

    try {
      const [orders, checkpoints] = await fetchOrdersData(email);

      setOrders(orders);
      setCheckpoints(checkpoints);

      if (orders.length > 0) setRedirect(true);
    } catch (err) {
      setOrders(null);
      console.error(err);
    }
  };

  if (redirect) {
    return <Redirect to="/orders" />;
  }

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
              inputProps={{ placeholder: "Email" }}
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
            No orders found!
          </Typography>
        </Box>
      )}
    </>
  );
}

import React from "react";
import { Paper, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { orderDataContext } from "../context";
import AddressDisplayField from "../Components/AddressDisplayField";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none;",
    "&:hover .MuiPaper-root": {
      boxShadow:
        "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);",
    },
  },
}));

const Orders = (): React.ReactElement => {
  const classes = useStyles();
  const { orders, checkPoints } = React.useContext(orderDataContext);

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Typography variant="h5" align="left">
          Your Orders
        </Typography>

        {orders &&
          orders.map((order, index) => (
            <Link className={classes.link} to={`/order/${order.orderNo}`} key={`${order.orderNo}-${index}`}>
              <Paper elevation={3}>
                <Box display="flex" justifyContent="space-between" mt={3} p={2}>
                  <Box>
                    <Typography variant="body1" align="left">
                      Order Number
                    </Typography>
                    <Typography variant="body2" align="left">
                      <strong>{order.orderNo}</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" align="left">
                      Current Status
                    </Typography>
                    <Typography variant="body2" align="left">
                      <strong>{checkPoints && checkPoints[order.tracking_number]?.status_text}</strong>
                    </Typography>
                  </Box>
                </Box>
                <AddressDisplayField order={order} />
              </Paper>
            </Link>
          ))}
      </Box>
    </Paper>
  );
};

export default Orders;

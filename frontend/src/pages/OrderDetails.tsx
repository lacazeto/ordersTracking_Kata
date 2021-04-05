import React from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Box, Paper } from "@material-ui/core";
import AddressDisplayField from "../Components/AddressDisplayField";
import { orderDataContext } from "../context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  img: {
    height: "45px",
    objectFit: "contain",
    width: "auto",
  },
}));

const OrderDetails = (): React.ReactElement => {
  const classes = useStyles();
  const params: { orderNo: string } = useParams();
  const { orderNo } = params;
  const { orders, checkPoints } = React.useContext(orderDataContext);

  const associatedOrders = orders ? orders.filter((order) => order.orderNo === orderNo) : [];
  const articles = associatedOrders
    .filter((order) => order.orderNo === orderNo && order.articleNo !== "")
    .map((order) => ({
      articleNo: order.articleNo,
      articleImageUrl: order.articleImageUrl,
      product_name: order.product_name,
      quantity: order.quantity,
    }));
  const order = associatedOrders[0];

  if (!order) {
    return (
      <Box my={4}>
        <Typography variant="h4" align="center">
          Missing data!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box my={2}>
        <Link to="/orders">Go back</Link>
      </Box>
      <Paper elevation={3}>
        <Box p={2}>
          <Box>
            <Typography variant="body1" align="left">
              <small>Order Number</small>
            </Typography>
            <Typography variant="body2" align="left">
              <strong>{order.orderNo}</strong>
            </Typography>
          </Box>
          <Box py={2}>
            <AddressDisplayField order={order} />
          </Box>
          {checkPoints && (
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="body1" align="left">
                  <small>Tracking Number</small>
                </Typography>
                <Typography variant="body2" align="left" paragraph={true}>
                  <strong>{checkPoints[order.tracking_number]?.tracking_number}</strong>
                </Typography>
                <Typography variant="body1" align="left">
                  <small>Current Status</small>
                </Typography>
                <Typography variant="body2" align="left">
                  <strong>{checkPoints[order.tracking_number]?.status_text}</strong>
                </Typography>
                <Typography variant="body2" align="left">
                  <small>{checkPoints[order.tracking_number]?.status_details}</small>
                </Typography>
              </Box>
            </Paper>
          )}
          {articles.length > 0 && (
            <Box py={2}>
              <Paper>
                <Box p={2}>
                  <Typography variant="body1" align="left">
                    <small>Articles</small>
                  </Typography>
                  {articles.map((article) => (
                    <Box display="flex" alignContent="space" py={1}>
                      <small>{article.quantity} x </small>
                      <img className={classes.img} alt="article" src={article.articleImageUrl} />
                      <Box>
                        <Typography variant="body2" align="left">
                          <strong>{article.product_name}</strong>
                        </Typography>
                        <Typography variant="body2" align="left">
                          <small>{article.articleNo}</small>
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default OrderDetails;

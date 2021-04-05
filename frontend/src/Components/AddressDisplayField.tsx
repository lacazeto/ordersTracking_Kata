import React from "react";
import { Typography, Box } from "@material-ui/core";
import { OrderTracking } from "@order-management-kata/backend/src/types/index";

interface Props {
  order: OrderTracking;
}

const AddressDisplayField = (props: Props): React.ReactElement => {
  const { order } = props;

  return (
    <Box p={2}>
      <Typography variant="body1" align="left">
        Delivery Address
      </Typography>
      <Typography variant="body2" align="left">
        <strong>
          {order.street}
          <br />
        </strong>
        <strong>{order.zip_code} </strong>
        <strong>{order.city}</strong>
      </Typography>
    </Box>
  );
};

export default AddressDisplayField;

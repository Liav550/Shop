import { Box } from "@mui/material";
import { OrderList } from "../components/adminOrders/OrderList";
import { useAuth } from "../contexts/useAuth";

const PreviousOrdersPage = () => {
  const { user } = useAuth();
  return (
    <Box padding={"0 20px"}>
      <OrderList height={"80vh"} url={`carts/${user?.id}/all`}></OrderList>
    </Box>
  );
};

export default PreviousOrdersPage;

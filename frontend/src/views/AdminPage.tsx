import { Grid } from "@mui/material";
import { AdminInformativeCard } from "../components/AdminInformativeCard";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import type { ReactNode } from "react";
import { RiAdminFill } from "react-icons/ri";
import { RiProductHuntFill } from "react-icons/ri";
import { ProductCreationForm } from "../components/ProductCreationForm";
import { OrderList } from "../components/adminOrders/OrderList";
interface InformativeCardProps {
  title: string;
  url: string;
  description: string;
  icon: ReactNode;
}

const AdminPage = () => {
  const informativeCards: InformativeCardProps[] = [
    {
      title: "Users",
      url: "/admin/users/count",
      description:
        "Total registered users in the system across all platforms and registration sources",
      icon: <FaUser />,
    },
    {
      title: "Admins",
      url: "/admin/admins/count",
      description:
        "Administrators with elevated privileges who manage products, orders and platform settings",
      icon: <RiAdminFill />,
    },
    {
      title: "Products",
      url: "/admin/products/count",
      description:
        "Active products currently available for purchase in the catalog (visible to users)",
      icon: <RiProductHuntFill />,
    },
    {
      title: "Orders",
      url: "/admin/orders/count",
      description:
        "All orders placed by users, including pending, processing and completed statuses",
      icon: <FaShoppingCart />,
    },
  ];
  return (
    <Grid container spacing={1} margin={1}>
      {informativeCards.map((card) => (
        <Grid size={3} key={card.title}>
          <AdminInformativeCard
            url={card.url}
            title={card.title}
            description={card.description}
            icon={card.icon}
          ></AdminInformativeCard>
        </Grid>
      ))}
      <Grid size={4}>
        <ProductCreationForm />
      </Grid>
      <Grid size={8}>
        <OrderList url="admin/orders" />
      </Grid>
    </Grid>
  );
};

export default AdminPage;

import { Grid, Paper } from "@mui/material";
import { AdminInformativeCard } from "../components/AdminInformativeCard";

interface InformativeCardProps {
  title: string;
  url: string;
  description: string;
}

const AdminPage = () => {
  const informativeCards: InformativeCardProps[] = [
    {
      title: "Users",
      url: "/admin/users/count",
      description:
        "Total registered users in the system across all platforms and registration sources",
    },
    {
      title: "Admins",
      url: "/admin/admins/count",
      description:
        "Administrators with elevated privileges who manage products, orders and platform settings",
    },
    {
      title: "Products",
      url: "/admin/products/count",
      description:
        "Active products currently available for purchase in the catalog (visible to users)",
    },
    {
      title: "Orders",
      url: "/admin/orders/count",
      description:
        "All orders placed by users, including pending, processing and completed statuses",
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
          ></AdminInformativeCard>
        </Grid>
      ))}
      <Grid size={4}>
        <Paper>5</Paper>
      </Grid>
      <Grid size={8}>
        <Paper>6</Paper>
      </Grid>
    </Grid>
  );
};

export default AdminPage;

import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={Link} to="/materials">
          <ListItemIcon><InventoryIcon /></ListItemIcon>
          <ListItemText primary="Materials" />
        </ListItem>

        <ListItem button component={Link} to="/products">
          <ListItemIcon><ProductionQuantityLimitsIcon /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>

        <ListItem button component={Link} to="/orders">
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        <ListItem button component={Link} to="/workers">
          <ListItemIcon><WorkIcon /></ListItemIcon>
          <ListItemText primary="Workers" />
        </ListItem>
      </List>
    </Drawer>
  );
}

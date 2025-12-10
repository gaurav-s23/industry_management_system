import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1400 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🏭 Industry Production ERP
        </Typography>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

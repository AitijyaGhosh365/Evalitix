import React, { useState } from "react";
import { 
  AppBar, Toolbar, Typography, IconButton, 
  Avatar, Menu, MenuItem, Box, Divider, ListItemIcon 
} from "@mui/material";
import { LogOut, User } from "lucide-react"; 
import { logout } from "../lib/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid", 
        borderColor: "#f1f5f9",
        color: "#1e293b" 
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 }, height: 70 }}>
        
        {/* ================= LOGO SECTION ================= */}
        <Box 
          onClick={() => navigate("/")}
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1.5, 
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:active': { transform: 'scale(0.95)' }
          }}
        >
          <Box 
            sx={{ 
              width: 34, 
              height: 34, 
              bgcolor: "#2563eb", 
              borderRadius: "10px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
            }} 
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <img
                  src="favicon.png"
                  alt="Evalitix Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800, 
              color: "#1e293b", 
              letterSpacing: "-1px",
              fontSize: "1.25rem"
            }}
          >
            Evalitix
          </Typography>
        </Box>

        {/* ================= ACCOUNT SECTION ================= */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              display: { xs: "none", sm: "block" }, 
              fontWeight: 700, 
              color: "#64748b",
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '10px'
            }}
          >
            My Workspace
          </Typography>
          
          <IconButton 
            onClick={handleMenuOpen} 
            sx={{ 
              p: 0.5, 
              border: '2px solid',
              borderColor: open ? '#2563eb' : '#f1f5f9',
              transition: 'all 0.2s'
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: "#2563eb", 
                fontSize: "0.85rem",
                fontWeight: 700
              }}
            >
              Ac
            </Avatar>
          </IconButton>
        </Box>

        {/* ================= DROPDOWN MENU ================= */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          disableScrollLock={true} // Prevents page jumping
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              width: 220,
              borderRadius: "16px",
              overflow: 'visible',
              filter: 'drop-shadow(0px 10px 25px rgba(0,0,0,0.1))',
              border: "1px solid #f1f5f9",
              p: 1
            },
          }}
        >
          <MenuItem 
            component={Link} 
            to="/account" 
            onClick={handleMenuClose} 
            sx={{ borderRadius: '10px', py: 1.2, mb: 0.5, fontWeight: 600, fontSize: '14px' }}
          >
            <ListItemIcon><User size={18} color="#64748b" /></ListItemIcon>
            Account Profile
          </MenuItem>
          
          {/* <MenuItem 
            component={Link} 
            to="/dashboard" 
            onClick={handleMenuClose} 
            sx={{ borderRadius: '10px', py: 1.2, mb: 0.5, fontWeight: 600, fontSize: '14px' }}
          >
            <ListItemIcon><LayoutDashboard size={18} color="#64748b" /></ListItemIcon>
            Billing
          </MenuItem> */}

          <Divider sx={{ my: 1, opacity: 0.5 }} />
          
          <MenuItem 
            onClick={() => { handleMenuClose(); logout(); }} 
            sx={{ 
              borderRadius: '10px', 
              py: 1.2, 
              color: "#ef4444", 
              fontWeight: 700,
              fontSize: '14px',
              '&:hover': { bgcolor: '#fef2f2' }
            }}
          >
            <ListItemIcon><LogOut size={18} color="#ef4444" /></ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
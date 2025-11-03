import React, { useContext, useEffect, useState } from 'react'; // Add React import here
import { Box, Button, AppBar, Toolbar, Typography, Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { AuthContext } from "react-oauth2-code-pkce"
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router"
import { logout, setCredentials } from "./store/authSlice";
import ActivityDetail from "./components/ActivityDetail";
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// Create a modern theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
  },
});

const ActivitiesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <ActivityForm onActivityAdded={() => window.location.reload()} />
      </Box>
      <ActivityList />
    </Container>
  );
}

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {!token ? (
          <Box
            sx={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                background: 'white',
                padding: 4,
                borderRadius: 4,
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                textAlign: 'center',
                maxWidth: 400,
                width: '90%',
              }}
            >
              <FitnessCenterIcon 
                sx={{ 
                  fontSize: 48, 
                  color: 'primary.main',
                  mb: 2 
                }} 
              />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                FitTrack
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Track your activities and get AI-powered recommendations
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => { logIn(); }}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar 
              position="static" 
              elevation={0}
              sx={{ 
                background: 'white', 
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Toolbar>
                <FitnessCenterIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                  FitTrack
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={logOut}
                  sx={{
                    borderColor: 'grey.300',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
            <Routes>
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/" element={token ? <Navigate to="/activities" replace /> : <div>Welcome! Please login</div>} />
            </Routes>
          </Box>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App
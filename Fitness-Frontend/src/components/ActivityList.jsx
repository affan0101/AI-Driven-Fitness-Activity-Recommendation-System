import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Container,
  Box,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { getActivities } from '../service/api';
import {
  AccessTime,
  LocalFireDepartment,
  CalendarToday,
  TrendingUp
} from '@mui/icons-material';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to load activities');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  const getActivityColor = (type) => {
    const colors = {
      RUNNING: '#10b981',
      WALKING: '#3b82f6',
      CYCLING: '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  const getActivityIcon = (type) => {
    const icons = {
      RUNNING: '🏃',
      WALKING: '🚶',
      CYCLING: '🚴'
    };
    return icons[type] || '🏃';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <TrendingUp sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No activities yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start by logging your first activity above!
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Your Activities
      </Typography>
      
      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} lg={4} key={activity.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '1.5rem', mr: 1 }}>
                      {getActivityIcon(activity.type)}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {activity.type}
                    </Typography>
                  </Box>
                  <Chip 
                    label={activity.type} 
                    size="small"
                    sx={{ 
                      backgroundColor: getActivityColor(activity.type),
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Duration:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, ml: 1 }}>
                    {activity.duration} minutes
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocalFireDepartment sx={{ fontSize: 16, color: 'error.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Calories:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, ml: 1 }}>
                    {activity.caloriesBurned}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarToday sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ActivityList;
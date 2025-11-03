import { 
  Box, 
  Card, 
  CardContent, 
  Divider, 
  Typography, 
  Chip,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Container,
  
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getActivityDetail } from '../service/api';
import {
  AccessTime,
  LocalFireDepartment,
  CalendarToday,
  TrendingUp,
  Lightbulb,
  Security
} from '@mui/icons-material';

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        setLoading(true);
        const response = await getActivityDetail(id);
        setActivity(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load activity details');
      } finally {
        setLoading(false);
      }
    }

    fetchActivityDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!activity) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <Alert severity="info">No activity data found</Alert>
      </Box>
    );
  }

  const getActivityColor = (type) => {
    const colors = {
      RUNNING: '#10b981',
      WALKING: '#3b82f6',
      CYCLING: '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        {/* Activity Summary Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Activity Details
              </Typography>
              <Chip 
                label={activity.type} 
                sx={{ 
                  backgroundColor: getActivityColor(activity.type),
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                  <AccessTime sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {activity.duration} min
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                  <LocalFireDepartment sx={{ fontSize: 32, color: 'error.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {activity.caloriesBurned}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Calories Burned
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                  <CalendarToday sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                  <AccessTime sx={{ fontSize: 32, color: 'secondary.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {new Date(activity.createdAt).toLocaleTimeString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* AI Recommendations Card */}
        {activity.recomendation && (
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', mb: 3 }}>
                <Lightbulb sx={{ mr: 1, color: 'warning.main' }} />
                AI Recommendations
              </Typography>
              
              {/* Analysis Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ mr: 1, fontSize: 20 }} />
                  Performance Analysis
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.50', borderLeft: 4, borderColor: 'primary.main' }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {activity.recomendation}
                  </Typography>
                </Paper>
              </Box>
              
              {activity.improvements && activity.improvements.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Areas for Improvement
                    </Typography>
                    <Grid container spacing={1}>
                      {activity.improvements.map((improvement, index) => (
                        <Grid item xs={12} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: 'primary.main',
                                mt: 1,
                                mr: 2,
                                flexShrink: 0
                              }}
                            />
                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                              {improvement}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}
              
              {activity.suggestions && activity.suggestions.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Training Suggestions
                    </Typography>
                    <Grid container spacing={2}>
                      {activity.suggestions.map((suggestion, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                              {suggestion}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}
              
              {activity.safety && activity.safety.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      <Security sx={{ mr: 1, fontSize: 20 }} />
                      Safety Guidelines
                    </Typography>
                    <Grid container spacing={1}>
                      {activity.safety.map((safety, index) => (
                        <Grid item xs={12} key={index}>
                          <Alert severity="info" sx={{ mb: 1 }}>
                            {safety}
                          </Alert>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default ActivityDetail
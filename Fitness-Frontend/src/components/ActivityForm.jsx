import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper
} from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../service/api';
import AddIcon from '@mui/icons-material/Add';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING", 
    duration: '', 
    caloriesBurned: '',
    additionalMetrics: {}
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({
        type: "RUNNING", 
        duration: '', 
        caloriesBurned: '',
        additionalMetrics: {}
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const activityTypes = [
    { value: "RUNNING", label: "Running", icon: "🏃" },
    { value: "WALKING", label: "Walking", icon: "🚶" },
    { value: "CYCLING", label: "Cycling", icon: "🚴" }
  ];

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          <AddIcon sx={{ mr: 1, color: 'primary.main' }} />
          Log New Activity
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Activity Type</InputLabel>
                <Select
                  value={activity.type}
                  onChange={(e) => setActivity({...activity, type: e.target.value})}
                  label="Activity Type"
                >
                  {activityTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 1, fontSize: '1.2rem' }}>{type.icon}</Typography>
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField 
                fullWidth
                label="Duration (Minutes)"
                type="number"
                value={activity.duration}
                onChange={(e) => setActivity({...activity, duration: e.target.value})}
                InputProps={{
                  inputProps: { min: 1 }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField 
                fullWidth
                label="Calories Burned"
                type="number"
                value={activity.caloriesBurned}
                onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={loading}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                }}
                startIcon={<DirectionsRunIcon />}
              >
                {loading ? 'Adding Activity...' : 'Add Activity'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ActivityForm;
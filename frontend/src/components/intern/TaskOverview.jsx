import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Search,
  Calendar,
  User,
  MessageSquare,
  Target
} from 'lucide-react';
import { 
  Box, Card, CardContent, Grid, Typography, TextField, IconButton, Chip, LinearProgress, Button, Avatar
} from '@mui/material';

const TaskOverview = ({ stats }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'React Hooks Workshop', description: 'Finish interactive hooks tutorial', status: 'completed', priority: 'high', dueDate: '2024-01-20', assignedBy: 'Sarah Chen', progress: 100, tags: ['React','Learning'] },
    { id: 2, title: 'Auth API Integration', description: 'Wire up JWT auth with backend', status: 'in-progress', priority: 'high', dueDate: '2024-01-25', assignedBy: 'Mike Johnson', progress: 65, tags: ['API'] },
    { id: 3, title: 'PR Review', description: 'Review recent PRs and give feedback', status: 'pending', priority: 'medium', dueDate: '2024-01-23', assignedBy: 'Emma Wilson', progress: 0, tags: ['Review'] }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = tasks.filter(t => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const updateStatus = (id, status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status, progress: status === 'completed' ? 100 : t.progress } : t));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight={700}>Your Tasks</Typography>
              <Typography variant="body2" color="text.secondary">Quickly access and update your current work</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField size="small" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <TextField select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} size="small" SelectProps={{ native: true }} sx={{ width: 140 }}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </TextField>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {filtered.map(task => (
              <Grid item xs={12} key={task.id}>
                <Card sx={{ borderRadius: 2, boxShadow: '0 8px 24px rgba(13, 42, 148, 0.08)' }}>
                  <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'linear-gradient(135deg,#6b21a8,#3b82f6)', width: 56, height: 56, fontWeight: 700 }}>{task.title.charAt(0)}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={700}>{task.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{task.description}</Typography>

                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Chip label={task.status.replace('-', ' ')} color={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'primary' : 'warning'} size="small" />
                        <Chip label={task.priority} size="small" />
                        {task.tags.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">Progress</Typography>
                          <Typography variant="caption" color="text.primary" fontWeight={600}>{task.progress}%</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={task.progress} sx={{ height: 8, borderRadius: 2 }} />
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {task.status !== 'in-progress' && <Button size="small" variant="contained" onClick={() => updateStatus(task.id, 'in-progress')}>Start</Button>}
                      {task.status === 'in-progress' && <Button size="small" variant="contained" color="success" onClick={() => updateStatus(task.id, 'completed')}>Complete</Button>}
                      <Button size="small" variant="outlined">Details</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, p: 2, mb: 2, boxShadow: '0 12px 32px rgba(59,130,246,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ width: 72, height: 72, borderRadius: 2, background: 'linear-gradient(135deg,#6b21a8,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 24 }}>IN</Box>
                <Box>
                  <Typography variant="h6" fontWeight={800}>Intern Snapshot</Typography>
                  <Typography variant="body2" color="text.secondary">Overview of your current activity</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Box sx={{ p: 2, borderRadius: 2, background: 'linear-gradient(180deg,#fff,#f8fafc)', textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={800}>{stats.totalTasks}</Typography>
                  <Typography variant="caption" color="text.secondary">Total Tasks</Typography>
                </Box>
                <Box sx={{ p: 2, borderRadius: 2, background: 'linear-gradient(180deg,#fff,#f8fafc)', textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={800}>{stats.completedTasks}</Typography>
                  <Typography variant="caption" color="text.secondary">Completed</Typography>
                </Box>
                <Box sx={{ p: 2, borderRadius: 2, background: 'linear-gradient(180deg,#fff,#f8fafc)', textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={800}>{stats.inProgressTasks}</Typography>
                  <Typography variant="caption" color="text.secondary">In Progress</Typography>
                </Box>
                <Box sx={{ p: 2, borderRadius: 2, background: 'linear-gradient(180deg,#fff,#f8fafc)', textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={800}>{stats.pendingTasks}</Typography>
                  <Typography variant="caption" color="text.secondary">Pending</Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <img src="/tms.png" alt="illustration" style={{ width: '100%', borderRadius: 12, marginTop: 12 }} />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 2, p: 2, boxShadow: '0 12px 32px rgba(99,102,241,0.06)' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>Tips & Resources</Typography>
              <Typography variant="body2" color="text.secondary">Check the learning resources to upskill and complete tasks faster.</Typography>
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>Open Learning Center</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default TaskOverview;
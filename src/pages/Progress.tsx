
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import workoutService from '@/services/workout.service';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';

const Progress = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [progressData, setProgressData] = useState<any[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      if (user?.id) {
        const data = await workoutService.getUserWorkoutStats(user.id);
        setStats(data);

        const progress = await workoutService.getWorkoutProgressData(user.id);
        // Process workout data for the chart
        const chartData = progress.map(session => ({
          date: format(new Date(session.startTime), 'MMM dd'),
          volume: session.sets.reduce((total, set) => total + (set.weight || 0) * set.reps, 0)
        }));
        setProgressData(chartData);
      }
    };
    loadStats();
  }, [user?.id]);

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats?.completedWorkouts || 0}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Total Weight Lifted</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {Math.round(stats?.totalWeightLifted || 0)} kg
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Last 30 Days</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {progressData.length} workouts
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Workout Volume Progress</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date"
                    tick={{ fill: '#888888' }}
                  />
                  <YAxis
                    tick={{ fill: '#888888' }}
                    label={{ 
                      value: 'Volume (kg)', 
                      angle: -90,
                      position: 'insideLeft',
                      style: { fill: '#888888' }
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Workouts */}
          {stats?.workoutHistory && stats.workoutHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.workoutHistory.map((session: any) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div>
                        <p className="font-medium">{session.workout.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(session.startTime), 'PPP')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {session.sets.length} sets completed
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.workout.duration} mins
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Progress;

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import authService from '@/services/auth.service';
import { Progress } from '@/components/ui/progress';
import { Weight, Target, User, Calendar } from 'lucide-react';

interface UserProfileData {
  age?: number;
  weight?: number;
  height?: number;
  fitnessGoal?: string;
  activityLevel?: string;
  preferredWorkouts?: string[];
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const data = await authService.getUserProfile(user.id);
        setProfile(data);
      }
    };
    loadProfile();
  }, [user?.id]);

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profilePicture || ''} />
                <AvatarFallback className="text-xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </CardContent>
          </Card>

          {/* Fitness Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Fitness Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.weight && (
                <div className="flex items-center space-x-4">
                  <Weight className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Current Weight</p>
                    <p className="text-2xl font-bold">{profile.weight} kg</p>
                  </div>
                </div>
              )}
              {profile?.fitnessGoal && (
                <div className="flex items-center space-x-4">
                  <Target className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Fitness Goal</p>
                    <p className="text-lg">{profile.fitnessGoal}</p>
                  </div>
                </div>
              )}
              {profile?.activityLevel && (
                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Activity Level</p>
                    <p className="text-lg">{profile.activityLevel}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

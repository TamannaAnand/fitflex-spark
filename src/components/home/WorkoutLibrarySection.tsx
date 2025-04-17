
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorkoutCard, { WorkoutCardProps } from '@/components/workouts/WorkoutCard';
import { Button } from '@/components/ui/button';

// Mock workout data
const mockWorkouts: WorkoutCardProps[] = [
  {
    id: '1',
    title: 'Full Body Blast',
    description: 'A complete workout targeting all major muscle groups for maximum results in minimal time.',
    duration: 45,
    difficulty: 'Intermediate',
    category: 'Strength',
  },
  {
    id: '2',
    title: 'HIIT Cardio Burn',
    description: 'High-intensity interval training to maximize calorie burn and boost your metabolism.',
    duration: 30,
    difficulty: 'Advanced',
    category: 'Cardio',
  },
  {
    id: '3',
    title: 'Beginner Bodyweight',
    description: 'Perfect starter workout using just your bodyweight, ideal for fitness newcomers.',
    duration: 20,
    difficulty: 'Beginner',
    category: 'Bodyweight',
  },
  {
    id: '4',
    title: 'Core Crusher',
    description: 'Intensive abdominal and core workout to build strength and definition.',
    duration: 25,
    difficulty: 'Intermediate',
    category: 'Strength',
  },
];

const WorkoutLibrarySection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Workout Library</h2>
            <p className="text-muted-foreground">Find the perfect workout for your fitness journey</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-fitflex-purple text-fitflex-purple hover:bg-fitflex-purple/10">
            View All Workouts
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="cardio">Cardio</TabsTrigger>
            <TabsTrigger value="bodyweight">Bodyweight</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} {...workout} />
            ))}
          </TabsContent>
          
          <TabsContent value="strength" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockWorkouts
              .filter((w) => w.category === 'Strength')
              .map((workout) => (
                <WorkoutCard key={workout.id} {...workout} />
              ))}
          </TabsContent>
          
          <TabsContent value="cardio" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockWorkouts
              .filter((w) => w.category === 'Cardio')
              .map((workout) => (
                <WorkoutCard key={workout.id} {...workout} />
              ))}
          </TabsContent>
          
          <TabsContent value="bodyweight" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockWorkouts
              .filter((w) => w.category === 'Bodyweight')
              .map((workout) => (
                <WorkoutCard key={workout.id} {...workout} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default WorkoutLibrarySection;

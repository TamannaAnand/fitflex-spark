
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Dumbbell, Play, Square, Check, Plus, Minus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  order: number;
  currentSets: ExerciseSet[];
}

const StartWorkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  
  // Get workout from state or mock data if not available
  const workout = location.state?.workout || {
    id: '1',
    title: 'Full Body Blast',
    description: 'A complete workout targeting all major muscle groups for maximum results in minimal time.',
    duration: 45,
    difficulty: 'Intermediate',
    category: 'Strength',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60',
  };
  
  // Mock exercises data (in a real app this would come from API)
  const [exercises, setExercises] = useState<WorkoutExercise[]>([
    {
      id: '1',
      name: 'Barbell Bench Press',
      sets: 3,
      reps: 10,
      restTime: 60,
      order: 1,
      currentSets: Array(3).fill(0).map((_, i) => ({ 
        setNumber: i + 1, 
        reps: 10, 
        weight: 135, 
        completed: false 
      })),
    },
    {
      id: '2',
      name: 'Dumbbell Rows',
      sets: 3,
      reps: 12,
      restTime: 45,
      order: 2,
      currentSets: Array(3).fill(0).map((_, i) => ({ 
        setNumber: i + 1, 
        reps: 12, 
        weight: 35, 
        completed: false 
      })),
    },
    {
      id: '3',
      name: 'Squats',
      sets: 4,
      reps: 8,
      restTime: 90,
      order: 3,
      currentSets: Array(4).fill(0).map((_, i) => ({ 
        setNumber: i + 1, 
        reps: 8, 
        weight: 185, 
        completed: false 
      })),
    },
  ]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleWorkout = () => {
    setIsActive(!isActive);
    
    if (!isActive) {
      toast({
        title: "Workout Started",
        description: `${workout.title} workout has begun. Let's get moving!`,
      });
    }
  };

  const completeWorkout = () => {
    setIsActive(false);
    toast({
      title: "Workout Completed",
      description: `Great job! You completed the ${workout.title} workout in ${formatTime(seconds)}.`,
    });
    // In a real app, we would save the workout session to the database here
    navigate('/workouts');
  };

  const handleSetCompleted = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].currentSets[setIndex].completed = 
      !updatedExercises[exerciseIndex].currentSets[setIndex].completed;
    setExercises(updatedExercises);
  };

  const updateSetWeight = (exerciseIndex: number, setIndex: number, change: number) => {
    const updatedExercises = [...exercises];
    const newWeight = updatedExercises[exerciseIndex].currentSets[setIndex].weight + change;
    if (newWeight >= 0) {
      updatedExercises[exerciseIndex].currentSets[setIndex].weight = newWeight;
      setExercises(updatedExercises);
    }
  };

  const updateSetReps = (exerciseIndex: number, setIndex: number, change: number) => {
    const updatedExercises = [...exercises];
    const newReps = updatedExercises[exerciseIndex].currentSets[setIndex].reps + change;
    if (newReps > 0) {
      updatedExercises[exerciseIndex].currentSets[setIndex].reps = newReps;
      setExercises(updatedExercises);
    }
  };

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{workout.title}</h1>
            <p className="text-muted-foreground">{workout.difficulty} • {workout.category} • {workout.duration} min</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 gap-4">
            <div className="text-xl font-mono">{formatTime(seconds)}</div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleWorkout}
              className={isActive ? "bg-red-100 hover:bg-red-200 text-red-600" : "bg-green-100 hover:bg-green-200 text-green-600"}
            >
              {isActive ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Current Exercise: {currentExerciseIndex + 1} of {exercises.length}</h2>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{currentExercise.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Dumbbell className="h-4 w-4" />
                  <span>{currentExercise.sets} sets × {currentExercise.reps} reps</span>
                  <span className="mx-1">•</span>
                  <Clock className="h-4 w-4" />
                  <span>{currentExercise.restTime}s rest</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-medium">Set</th>
                      <th className="py-2 text-left font-medium">Previous</th>
                      <th className="py-2 text-left font-medium">Weight (lbs)</th>
                      <th className="py-2 text-left font-medium">Reps</th>
                      <th className="py-2 text-left font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentExercise.currentSets.map((set, setIndex) => (
                      <tr key={setIndex} className="border-b last:border-0">
                        <td className="py-3">{set.setNumber}</td>
                        <td className="py-3 text-muted-foreground">135 × 10</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7" 
                              onClick={() => updateSetWeight(currentExerciseIndex, setIndex, -5)}
                              disabled={set.completed}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center">{set.weight}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7" 
                              onClick={() => updateSetWeight(currentExerciseIndex, setIndex, 5)}
                              disabled={set.completed}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7" 
                              onClick={() => updateSetReps(currentExerciseIndex, setIndex, -1)}
                              disabled={set.completed}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{set.reps}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7" 
                              onClick={() => updateSetReps(currentExerciseIndex, setIndex, 1)}
                              disabled={set.completed}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 text-right">
                          <Button 
                            variant={set.completed ? "default" : "outline"} 
                            size="sm"
                            className={set.completed ? "bg-green-600 hover:bg-green-700" : ""}
                            onClick={() => handleSetCompleted(currentExerciseIndex, setIndex)}
                          >
                            {set.completed ? <Check className="mr-1 h-4 w-4" /> : null}
                            {set.completed ? "Done" : "Complete"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentExerciseIndex(Math.max(0, currentExerciseIndex - 1))}
                  disabled={currentExerciseIndex === 0}
                >
                  Previous
                </Button>
                
                <Button 
                  variant="default"
                  onClick={() => {
                    if (currentExerciseIndex < exercises.length - 1) {
                      setCurrentExerciseIndex(currentExerciseIndex + 1);
                    } else {
                      completeWorkout();
                    }
                  }}
                >
                  {currentExerciseIndex === exercises.length - 1 ? "Finish Workout" : "Next Exercise"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StartWorkout;

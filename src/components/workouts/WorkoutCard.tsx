
import React from 'react';
import { Clock, Flame, Dumbbell, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface WorkoutCardProps {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Strength' | 'Cardio' | 'Bodyweight' | 'Yoga' | 'Flexibility';
  imageUrl?: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  id,
  title,
  description,
  duration,
  difficulty,
  category,
  imageUrl,
}) => {
  
  // Determine difficulty color
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-orange-100 text-orange-800',
    Advanced: 'bg-red-100 text-red-800',
  }[difficulty];
  
  // Determine category icon
  const CategoryIcon = {
    Strength: () => <Dumbbell className="h-4 w-4" />,
    Cardio: () => <Flame className="h-4 w-4" />,
    Bodyweight: () => <Dumbbell className="h-4 w-4" />,
    Yoga: () => <Flame className="h-4 w-4" />,
    Flexibility: () => <Flame className="h-4 w-4" />,
  }[category];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fitflex-purple/20 to-fitflex-orange/20">
            <span className="text-sm text-muted-foreground">Workout Image</span>
          </div>
        )}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
          {difficulty}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <CategoryIcon />
          <span>{category}</span>
          <span className="mx-1">•</span>
          <Clock className="h-4 w-4" />
          <span>{duration} min</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="text-fitflex-purple hover:text-fitflex-purple-dark hover:bg-fitflex-purple/10">
          Save
        </Button>
        <Button variant="ghost" size="sm" className="text-fitflex-purple hover:text-fitflex-purple-dark hover:bg-fitflex-purple/10 group">
          Start
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;

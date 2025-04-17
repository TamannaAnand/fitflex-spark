
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import WorkoutCard, { WorkoutCardProps } from './WorkoutCard';

// Mock data - this would come from your backend in a real app
const mockWorkouts: WorkoutCardProps[] = [
  {
    id: '1',
    title: 'Full Body Blast',
    description: 'A complete workout targeting all major muscle groups for maximum results in minimal time.',
    duration: 45,
    difficulty: 'Intermediate',
    category: 'Strength',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    title: 'HIIT Cardio Burn',
    description: 'High-intensity interval training to maximize calorie burn and boost your metabolism.',
    duration: 30,
    difficulty: 'Advanced',
    category: 'Cardio',
    imageUrl: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    title: 'Beginner Bodyweight',
    description: 'Perfect starter workout using just your bodyweight, ideal for fitness newcomers.',
    duration: 20,
    difficulty: 'Beginner',
    category: 'Bodyweight',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    title: 'Yoga Flow',
    description: 'A calming yet challenging yoga sequence to improve flexibility and mindfulness.',
    duration: 40,
    difficulty: 'Beginner',
    category: 'Yoga',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60',
  },
];

const categories = ['All', 'Strength', 'Cardio', 'Bodyweight', 'Yoga', 'Flexibility'] as const;
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;

const WorkoutsGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<(typeof difficulties)[number]>('All');

  const filteredWorkouts = mockWorkouts.filter((workout) => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || workout.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || workout.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(difficulty)}
                size="sm"
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} {...workout} />
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No workouts found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkoutsGrid;

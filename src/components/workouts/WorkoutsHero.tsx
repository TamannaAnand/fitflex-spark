
import React from 'react';
import { Dumbbell } from 'lucide-react';

const WorkoutsHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-fitflex-purple/10 to-fitflex-orange/10 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <Dumbbell className="h-6 w-6 text-fitflex-purple" />
          <h1 className="text-3xl font-bold">Workouts Library</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Discover a variety of workouts tailored to your fitness level. From beginner-friendly exercises 
          to advanced routines, find the perfect workout to achieve your fitness goals.
        </p>
      </div>
    </section>
  );
};

export default WorkoutsHero;

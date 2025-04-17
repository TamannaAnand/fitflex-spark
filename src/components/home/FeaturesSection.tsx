
import React from 'react';
import { Dumbbell, ChartBar, Users, Trophy } from 'lucide-react';

const features = [
  {
    title: 'Workout Library',
    description: 'Access hundreds of professionally designed workouts for all fitness levels and goals.',
    icon: Dumbbell,
  },
  {
    title: 'Progress Tracking',
    description: 'Track your sets, reps, and weights. Visualize your progress with intuitive charts.',
    icon: ChartBar,
  },
  {
    title: 'Community Support',
    description: 'Join a community of fitness enthusiasts who share tips, achievements, and motivation.',
    icon: Users,
  },
  {
    title: 'Achievement System',
    description: 'Earn badges and track your streaks to stay motivated on your fitness journey.',
    icon: Trophy,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Achieve Your Fitness Goals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            FitFlex provides all the tools you need to transform your body and mind through consistent, effective workouts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-6 rounded-lg bg-background shadow-sm border border-border hover:border-fitflex-purple/40 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-fitflex-purple/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-fitflex-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

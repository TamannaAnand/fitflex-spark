
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-fitflex-light-purple/30 to-background z-0"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fitflex-purple-dark to-fitflex-purple">
              Transform Your Body, <span className="text-foreground">Elevate Your Mind</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              Personalized workouts, progress tracking, and a supportive community to help you achieve your fitness goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-gradient group gap-2 text-base">
                Start Your First Workout
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="border-fitflex-purple text-fitflex-purple hover:bg-fitflex-purple/10">
                Explore Workouts
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              {/* Image placeholder - in a real app, this would be an image */}
              <div className="w-[300px] md:w-[400px] h-[400px] md:h-[500px] rounded-2xl bg-gradient-to-br from-fitflex-purple/20 to-fitflex-orange/20 flex items-center justify-center">
                <span className="text-lg text-gray-400">Hero Image Placeholder</span>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-fitflex-purple/20"></div>
              <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-fitflex-orange/20"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background/0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,197.3C840,203,960,181,1080,154.7C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

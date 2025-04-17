
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import WorkoutLibrarySection from '@/components/home/WorkoutLibrarySection';
import MotivationalQuote from '@/components/common/MotivationalQuote';

const Index: React.FC = () => {
  // This would typically come from a Supabase fetch, but we're mocking for now
  const motivationalQuote = {
    quote: "The only bad workout is the one that didn't happen. Every step forward is progress, no matter how small.",
    author: "Fitness Motivator"
  };

  return (
    <Layout>
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <MotivationalQuote quote={motivationalQuote.quote} author={motivationalQuote.author} />
      </div>
      <FeaturesSection />
      <WorkoutLibrarySection />
    </Layout>
  );
};

export default Index;

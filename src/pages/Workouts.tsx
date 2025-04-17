
import React from 'react';
import Layout from '@/components/layout/Layout';
import WorkoutsHero from '@/components/workouts/WorkoutsHero';
import WorkoutsGrid from '@/components/workouts/WorkoutsGrid';

const Workouts = () => {
  return (
    <Layout>
      <WorkoutsHero />
      <WorkoutsGrid />
    </Layout>
  );
};

export default Workouts;


import prisma from '@/lib/prisma';

class WorkoutService {
  async getUserWorkoutStats(userId: string) {
    const completedWorkouts = await prisma.workoutSession.count({
      where: {
        userId,
        completed: true
      }
    });

    const workoutHistory = await prisma.workoutSession.findMany({
      where: {
        userId,
        completed: true
      },
      include: {
        workout: true,
        sets: true
      },
      orderBy: {
        startTime: 'desc'
      },
      take: 10
    });

    // Calculate total weight lifted across all completed sets
    const totalWeightLifted = await prisma.workoutSessionSet.aggregate({
      where: {
        workoutSession: {
          userId,
          completed: true
        },
        weight: {
          not: null
        }
      },
      _sum: {
        weight: true
      }
    });

    return {
      completedWorkouts,
      workoutHistory,
      totalWeightLifted: totalWeightLifted._sum.weight || 0
    };
  }

  async getWorkoutProgressData(userId: string) {
    const last30Days = await prisma.workoutSession.findMany({
      where: {
        userId,
        completed: true,
        startTime: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      },
      include: {
        sets: true
      },
      orderBy: {
        startTime: 'asc'
      }
    });

    return last30Days;
  }
}

export const workoutService = new WorkoutService();
export default workoutService;


import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData extends AuthCredentials {
  name: string;
}

export interface OnboardingData {
  userId: string;
  age: number;
  weight: number;
  height: number;
  fitnessGoal: string;
  activityLevel: string;
  preferredWorkouts: string[];
}

class AuthService {
  /**
   * Register a new user with email and password
   */
  async signup({ email, password, name }: SignupData): Promise<User> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      }
    });

    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  /**
   * Authenticate a user by email and password
   */
  async login({ email, password }: AuthCredentials): Promise<User> {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.password) {
      throw new Error('Invalid email or password');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  /**
   * Create or update user profile with onboarding data
   */
  async saveUserProfile(data: OnboardingData): Promise<void> {
    const { userId, ...profileData } = data;

    await prisma.userProfile.upsert({
      where: { userId },
      update: {
        age: profileData.age,
        weight: profileData.weight,
        height: profileData.height,
        fitnessGoal: profileData.fitnessGoal,
        activityLevel: profileData.activityLevel,
        preferredWorkouts: profileData.preferredWorkouts,
      },
      create: {
        userId,
        age: profileData.age,
        weight: profileData.weight,
        height: profileData.height,
        fitnessGoal: profileData.fitnessGoal,
        activityLevel: profileData.activityLevel,
        preferredWorkouts: profileData.preferredWorkouts,
      },
    });
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string) {
    return prisma.userProfile.findUnique({
      where: { userId },
    });
  }
}

export const authService = new AuthService();
export default authService;


import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const onboardingSchema = z.object({
  age: z.string().refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num > 0 && num < 120;
  }, { message: 'Please enter a valid age' }),
  weight: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, { message: 'Please enter a valid weight' }),
  height: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, { message: 'Please enter a valid height' }),
  fitnessGoal: z.string().min(1, { message: 'Please select a fitness goal' }),
  activityLevel: z.string().min(1, { message: 'Please select your activity level' }),
  preferredWorkouts: z.array(z.string()).min(1, { message: 'Please select at least one workout type' }),
});

type WorkoutType = {
  id: string;
  label: string;
};

const workoutTypes: WorkoutType[] = [
  { id: 'strength', label: 'Strength Training' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'hiit', label: 'HIIT' },
  { id: 'yoga', label: 'Yoga' },
  { id: 'pilates', label: 'Pilates' },
  { id: 'calisthenics', label: 'Calisthenics' },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      age: '',
      weight: '',
      height: '',
      fitnessGoal: '',
      activityLevel: '',
      preferredWorkouts: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    try {
      // This will be replaced with a real API call
      console.log('Onboarding data:', values);
      toast.success('Profile created successfully!');
      
      // Navigate to home page after successful onboarding
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast.error('Failed to save profile information');
      console.error('Onboarding error:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-fitflex-purple">Let's Get to Know You</h1>
            <p className="text-gray-600 mt-2">
              Help us personalize your fitness journey by sharing a bit about yourself
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Age Field */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Your age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Weight Field */}
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="Your weight" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Height Field */}
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="Your height" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Fitness Goal */}
              <FormField
                control={form.control}
                name="fitnessGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's your primary fitness goal?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fitness goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lose_weight">Lose Weight</SelectItem>
                        <SelectItem value="build_muscle">Build Muscle</SelectItem>
                        <SelectItem value="improve_endurance">Improve Endurance</SelectItem>
                        <SelectItem value="increase_flexibility">Increase Flexibility</SelectItem>
                        <SelectItem value="maintain_fitness">Maintain Current Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Activity Level */}
              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's your current activity level?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (New to fitness)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Work out 1-3 times weekly)</SelectItem>
                        <SelectItem value="advanced">Advanced (Work out 4+ times weekly)</SelectItem>
                        <SelectItem value="athlete">Athlete (Intense daily training)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Preferred Workouts */}
              <FormField
                control={form.control}
                name="preferredWorkouts"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">What types of workouts do you prefer?</FormLabel>
                      <FormDescription>
                        Select all that apply
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {workoutTypes.map((type) => (
                        <FormField
                          key={type.id}
                          control={form.control}
                          name="preferredWorkouts"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={type.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(type.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, type.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== type.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {type.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-fitflex-purple hover:bg-fitflex-purple-dark transition-colors"
              >
                Complete Profile
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Onboarding;

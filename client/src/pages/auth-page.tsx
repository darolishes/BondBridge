import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { MessageCircleHeart } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { loginMutation, registerMutation, user } = useAuth();
  const [location, navigate] = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Login form setup
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form setup
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    // Create a valid user object from form data, removing confirmPassword
    const { confirmPassword, ...userInfo } = data;
    registerMutation.mutate(userInfo);
  };

  const isLoginPending = loginMutation.isPending;
  const isRegisterPending = registerMutation.isPending;

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 my-auto">
        <Card className="w-full max-w-md shadow-sm border-gray-100 border-gray-400">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary rounded-full p-3 inline-flex shadow-sm border border-[#a5e5d0]">
                <MessageCircleHeart className="h-7 w-7 text-gray-700" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">BondBridge</CardTitle>
            <p className="text-gray-500 mt-2">Connect deeper through meaningful conversations</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-gray-800 border border-[#a5e5d0] hover:bg-[#c2f0df]" 
                      disabled={isLoginPending}
                    >
                      {isLoginPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6 max-w-sm mx-auto mt-8">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Choose a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-accent text-gray-800 border border-[#ddbcea] hover:bg-[#e9d1f0]" 
                      disabled={isRegisterPending}
                    >
                      {isRegisterPending ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Hero */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/80 to-accent/80 p-8 text-gray-800 items-center justify-center my-auto">
        <div className="max-w-md bg-white/90 p-10 rounded-3xl shadow-sm border border-white/50">
          <h1 className="text-4xl font-bold mb-6">Build Deeper Connections</h1>
          <p className="text-xl mb-8 text-gray-700">
            BondBridge helps you create meaningful conversations through thoughtfully designed conversation cards.
          </p>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary p-3 rounded-full mr-4 shadow-sm border border-[#a5e5d0]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M7 10h10" />
                  <path d="M7 14h10" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Discover Conversation Starters</h3>
                <p className="text-gray-600">Browse through hundreds of thought-provoking questions</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-accent p-3 rounded-full mr-4 shadow-sm border border-[#ddbcea]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Save Your Favorites</h3>
                <p className="text-gray-600">Keep a collection of cards you love for future use</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#FFEEB3] p-3 rounded-full mr-4 shadow-sm border border-[#FFD166]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                  <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Access Offline</h3>
                <p className="text-gray-600">Use your saved cards even without an internet connection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

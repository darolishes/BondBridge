import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NavBar } from "@/components/layout/nav-bar";
import { ProfileSection } from "@/components/profile/profile-section";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, ChevronRight, LogOut, Settings, Shield, Bell, Moon, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<any>(user?.preferences || {
    darkMode: false,
    notifications: true,
    offlineMode: false
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (preferences: any) => {
      const res = await apiRequest("PATCH", "/api/user/preferences", { preferences });
      return await res.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/user"], updatedUser);
      toast({
        title: "Preferences updated",
        description: "Your settings have been saved."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update preferences",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handlePreferenceChange = (key: string, value: boolean) => {
    const updatedPreferences = { ...preferences, [key]: value };
    setPreferences(updatedPreferences);
    updatePreferencesMutation.mutate(updatedPreferences);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleExportData = () => {
    // In a real implementation, this would fetch all user data 
    // and create a downloadable file
    const userData = JSON.stringify(user, null, 2);
    const blob = new Blob([userData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bondbridge-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data exported",
      description: "Your data has been exported successfully."
    });
  };

  const handleImportData = () => {
    // In a real implementation, this would open a file picker
    // and process the imported data
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const importedData = JSON.parse(reader.result as string);
            // Process imported data
            toast({
              title: "Data imported",
              description: "Your data has been imported successfully."
            });
          } catch (err) {
            toast({
              title: "Import failed",
              description: "There was an error processing your file.",
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  // Get a random gradient based on the first letter of username
  const getGradient = (name: string = 'u') => {
    const firstChar = name.charAt(0).toLowerCase();
    const charCode = firstChar.charCodeAt(0);
    const gradients = [
      "from-indigo-500 to-purple-600",
      "from-blue-500 to-teal-400",
      "from-green-400 to-emerald-600",
      "from-yellow-400 to-orange-500",
      "from-rose-400 to-pink-600"
    ];
    
    return gradients[charCode % gradients.length];
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pb-20">
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-emerald-600/30 to-transparent -z-10"></div>

      <header className="p-5">
        <h2 className="font-heading font-semibold text-xl text-white">Your Profile</h2>
      </header>

      <main className="flex-grow overflow-y-auto px-5">
        <motion.div 
          className="mb-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`w-28 h-28 bg-gradient-to-br ${getGradient(user?.username)} rounded-2xl flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg`}>
            {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : user?.username.substring(0, 2).toUpperCase()}
          </div>
          <h3 className="text-xl font-heading font-semibold mb-1 text-white">
            {user?.displayName || user?.username}
          </h3>
          <p className="text-white/60 mb-5">{user?.email || user?.username}</p>
          <Button variant="outline" className="bg-white/10 text-white border-white/10 hover:bg-white/20">
            <Settings className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </motion.div>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProfileSection title="Preferences">
              <div className="space-y-4 p-1">
                <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                  <ToggleSwitch
                    label={
                      <div className="flex items-center">
                        <Moon className="h-4 w-4 mr-3 text-purple-400" />
                        <span>Dark Mode</span>
                      </div>
                    }
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
                  />
                </div>
                <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                  <ToggleSwitch
                    label={
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 mr-3 text-rose-400" />
                        <span>Notifications</span>
                      </div>
                    }
                    checked={preferences.notifications}
                    onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                  />
                </div>
                <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                  <ToggleSwitch
                    label={
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-3 text-amber-400" />
                        <span>Offline Mode</span>
                      </div>
                    }
                    checked={preferences.offlineMode}
                    onCheckedChange={(checked) => handlePreferenceChange('offlineMode', checked)}
                  />
                </div>
              </div>
            </ProfileSection>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProfileSection title="Data & Privacy">
              <div className="space-y-3 p-1">
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center bg-white/5 border-white/10 text-white hover:bg-white/10"
                  onClick={handleExportData}
                >
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-emerald-400" />
                    <span>Export Your Data</span>
                  </div>
                  <Download size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center bg-white/5 border-white/10 text-white hover:bg-white/10"
                  onClick={handleImportData}
                >
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-400" />
                    <span>Import Data</span>
                  </div>
                  <Upload size={16} />
                </Button>
              </div>
            </ProfileSection>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ProfileSection title="Account">
              <div className="space-y-3 p-1">
                <Button variant="outline" className="w-full flex justify-between items-center bg-white/5 border-white/10 text-white hover:bg-white/10">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-purple-400" />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center bg-gradient-to-r from-rose-500/70 to-rose-600/70 border-rose-500/50 text-white hover:from-rose-500/90 hover:to-rose-600/90"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <span>{logoutMutation.isPending ? "Logging out..." : "Log Out"}</span>
                  <LogOut size={16} />
                </Button>
              </div>
            </ProfileSection>
          </motion.div>
        </div>
      </main>

      <NavBar activeTab="profile" />
    </div>
  );
}

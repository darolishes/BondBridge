import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NavBar } from "@/components/layout/nav-bar";
import { ProfileSection } from "@/components/profile/profile-section";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, ChevronRight, LogOut } from "lucide-react";

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

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <header className="bg-primary text-secondary px-4 py-5">
        <h2 className="font-heading font-semibold text-xl text-center">Your Profile</h2>
      </header>

      <main className="flex-grow bg-secondary rounded-t-3xl -mt-2 overflow-y-auto">
        <div className="p-5">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-[#4ECDC4] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
              {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : user?.username.substring(0, 2).toUpperCase()}
            </div>
            <h3 className="text-xl font-heading font-semibold mb-1">
              {user?.displayName || user?.username}
            </h3>
            <p className="text-gray-500 mb-4">{user?.email || user?.username}</p>
            <Button variant="outline" className="mb-6">
              Edit Profile
            </Button>
          </div>
          
          <div className="space-y-5">
            <ProfileSection title="Preferences">
              <div className="space-y-3">
                <ToggleSwitch
                  label="Dark Mode"
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
                />
                <ToggleSwitch
                  label="Notifications"
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                />
                <ToggleSwitch
                  label="Offline Mode"
                  checked={preferences.offlineMode}
                  onCheckedChange={(checked) => handlePreferenceChange('offlineMode', checked)}
                />
              </div>
            </ProfileSection>
            
            <ProfileSection title="Data & Privacy">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center"
                  onClick={handleExportData}
                >
                  <span>Export Your Data</span>
                  <Download size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center"
                  onClick={handleImportData}
                >
                  <span>Import Data</span>
                  <Upload size={18} />
                </Button>
              </div>
            </ProfileSection>
            
            <ProfileSection title="Account">
              <div className="space-y-3">
                <Button variant="outline" className="w-full flex justify-between items-center">
                  <span>Account Settings</span>
                  <ChevronRight size={18} />
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full flex justify-between items-center"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <span>{logoutMutation.isPending ? "Logging out..." : "Log Out"}</span>
                  <LogOut size={18} />
                </Button>
              </div>
            </ProfileSection>
          </div>
        </div>
      </main>

      <NavBar activeTab="profile" />
    </div>
  );
}

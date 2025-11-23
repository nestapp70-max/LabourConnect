import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardTechnicianCard } from '@/components/dashboard-technician-card';
import { DashboardJobCard } from '@/components/dashboard-job-card';
import { ServiceCategorySlider } from '@/components/service-category-slider';
import { VoiceSearch } from '@/components/voice-search';
import { PostJobModal } from '@/components/post-job-modal';
import { UnlockContactModal } from '@/components/unlock-contact-modal';
import { RechargeModal } from '@/components/recharge-modal';
import { useLanguage } from '@/components/language-provider';
import { Search, Briefcase, User, Loader2 } from 'lucide-react';
import { LABOUR_CATEGORIES } from '@shared/schema';
import type { TechnicianWithUser, JobWithCustomer, User as UserType } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';

export default function CustomerDashboard() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [user, setUser] = useState<UserType | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<string>('');
  const [unlockedTechnicians, setUnlockedTechnicians] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  // Construct query params for technician search
  const techQueryParams = new URLSearchParams();
  if (selectedCategory && selectedCategory !== 'all') techQueryParams.append('category', selectedCategory);
  if (searchLocation) techQueryParams.append('location', searchLocation);
  const techQueryString = techQueryParams.toString();
  
  const { data: technicians = [], isLoading: loadingTechnicians } = useQuery<TechnicianWithUser[]>({
    queryKey: techQueryString ? [`/api/technicians?${techQueryString}`] : ['/api/technicians'],
  });

  const { data: jobs = [], isLoading: loadingJobs } = useQuery<JobWithCustomer[]>({
    queryKey: user ? [`/api/jobs/my-jobs?customerId=${user.id}`] : ['/api/jobs/my-jobs'],
    enabled: !!user,
  });

  const { data: unlockedContacts = [] } = useQuery<any[]>({
    queryKey: user ? [`/api/chat-unlocks/my-unlocks?customerId=${user.id}`] : ['/api/chat-unlocks/my-unlocks'],
    enabled: !!user,
  });

  useEffect(() => {
    if (unlockedContacts) {
      setUnlockedTechnicians(new Set(unlockedContacts.map((u: any) => u.technicianId)));
    }
  }, [unlockedContacts]);

  const handlePostJobClick = () => {
    // Check if user has wallet balance
    if (!user) return;
    
    const walletBalance = Number(user.walletBalance) || 0;
    
    // If no balance, show recharge modal first
    if (walletBalance <= 0) {
      setRechargeModalOpen(true);
      return;
    }
    
    // Otherwise, show post job modal
    setPostJobOpen(true);
  };

  const handleRecharge = async (amount: number) => {
    if (!user) return;
    
    try {
      await apiRequest('POST', '/api/wallet/recharge', {
        userId: user.id,
        amount: amount.toString(),
      });
      
      toast({
        title: 'Wallet Recharged!',
        description: `₹${amount} added to your wallet. You can now post a job.`,
      });
      
      // Update user wallet balance
      const updatedUserResponse = await fetch(`/api/users/${user.id}`);
      const updatedUser = await updatedUserResponse.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Close recharge modal and open post job modal
      setRechargeModalOpen(false);
      setPostJobOpen(true);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to recharge wallet. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handlePostJob = async (data: any) => {
    try {
      await apiRequest('POST', '/api/jobs', data);
      toast({
        title: 'Job Posted!',
        description: 'Your job has been posted successfully. Technicians can now bid on it.',
      });
      // Invalidate jobs query to refresh the list
      if (user) {
        queryClient.invalidateQueries({ queryKey: [`/api/jobs/my-jobs?customerId=${user.id}`] });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to post job. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUnlockContact = (technicianId: string) => {
    setSelectedTechnicianId(technicianId);
    setUnlockModalOpen(true);
  };

  const confirmUnlock = async () => {
    if (!user) return;
    
    try {
      await apiRequest('POST', '/api/chat-unlocks', { 
        customerId: user.id,
        technicianId: selectedTechnicianId 
      });
      setUnlockModalOpen(false);
      toast({
        title: 'Contact Unlocked!',
        description: 'You can now view the technician\'s phone number.',
      });
      // Refresh unlocks
      queryClient.invalidateQueries({ queryKey: [`/api/chat-unlocks/my-unlocks?customerId=${user.id}`] });
      // Refresh user wallet
      const updatedUserResponse = await fetch(`/api/users/${user.id}`);
      const updatedUser = await updatedUserResponse.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Invalidate unlocks query
      queryClient.invalidateQueries({ queryKey: [`/api/chat-unlocks/my-unlocks?customerId=${user.id}`] });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to unlock contact. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const selectedTechnician = technicians.find(t => t.id === selectedTechnicianId);

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Find and hire skilled technicians</p>
          </div>
          <Button size="lg" onClick={handlePostJobClick} data-testid="button-post-job">
            <Briefcase className="h-5 w-5 mr-2" />
            {t('job.post')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Find Technicians</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search.placeholder')}
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                  data-testid="input-filter-location"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64" data-testid="select-filter-category">
                  <SelectValue placeholder={t('search.category')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {LABOUR_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <VoiceSearch onResult={setSearchLocation} />
            </div>
            <ServiceCategorySlider
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </CardContent>
        </Card>

        {/* Two Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TECHNICIANS PANEL */}
          <div className="space-y-0">
            {loadingTechnicians ? (
              <div className="rounded-lg border border-border bg-card p-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : technicians.length === 0 ? (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No technicians found</h3>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your filters or search in a different location
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-base font-semibold mb-1">Available Technicians</h2>
                <p className="text-xs text-muted-foreground mb-4">Closest & verified — click WhatsApp to chat or tap to view profile</p>
                <div className="space-y-3" data-testid="technicians-list">
                  {technicians.slice(0, 6).map((technician) => (
                    <DashboardTechnicianCard
                      key={technician.id}
                      technician={technician}
                      isUnlocked={unlockedTechnicians.has(technician.id)}
                      onUnlock={handleUnlockContact}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* JOBS / BIDS PANEL */}
          <div className="space-y-0">
            {loadingJobs ? (
              <div className="rounded-lg border border-border bg-card p-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No jobs posted yet</h3>
                <p className="text-muted-foreground mb-4">
                  Post your first job to receive bids from qualified technicians
                </p>
                <Button onClick={handlePostJobClick} data-testid="button-post-first-job">
                  {t('job.post')}
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="text-base font-semibold mb-1">Customer Job Bids</h2>
                <p className="text-xs text-muted-foreground mb-4">Open jobs — technicians bid, customers accept the best offer</p>
                <div className="space-y-3" data-testid="jobs-list">
                  {jobs.slice(0, 6).map((job) => (
                    <DashboardJobCard
                      key={job.id}
                      job={job}
                      isCustomer
                      onViewBids={(jobId) => console.log('View bids for job:', jobId)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {user && (
        <>
          <PostJobModal
            open={postJobOpen}
            onClose={() => setPostJobOpen(false)}
            onSubmit={handlePostJob}
            customerId={user.id}
          />
          <RechargeModal
            open={rechargeModalOpen}
            onClose={() => setRechargeModalOpen(false)}
            onRecharge={handleRecharge}
          />
          {selectedTechnician && (
            <UnlockContactModal
              open={unlockModalOpen}
              onClose={() => setUnlockModalOpen(false)}
              onConfirm={confirmUnlock}
              technicianName={selectedTechnician.user.name}
              walletBalance={Number(user.walletBalance) || 0}
            />
          )}
        </>
      )}
    </div>
  );
}

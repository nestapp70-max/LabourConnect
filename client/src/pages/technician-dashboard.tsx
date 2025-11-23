import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { JobCard } from '@/components/job-card';
import { DashboardJobCard } from '@/components/dashboard-job-card';
import { PlaceBidModal } from '@/components/place-bid-modal';
import { RatingDisplay } from '@/components/rating-display';
import { useLanguage } from '@/components/language-provider';
import { Briefcase, User, TrendingUp, MapPin, Star, Loader2 } from 'lucide-react';
import type { JobWithCustomer, Technician, User as UserType } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function TechnicianDashboard() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [user, setUser] = useState<UserType | null>(null);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobWithCustomer | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const { data: technician, isLoading: loadingProfile } = useQuery<Technician>({
    queryKey: user ? [`/api/technicians/my-profile?userId=${user.id}`] : ['/api/technicians/my-profile'],
    enabled: !!user,
  });

  const { data: availableJobs = [], isLoading: loadingJobs } = useQuery<JobWithCustomer[]>({
    queryKey: ['/api/jobs/available'],
  });

  const { data: myBids = [], isLoading: loadingBids } = useQuery<any[]>({
    queryKey: technician ? [`/api/bids/my-bids?technicianId=${technician.id}`] : ['/api/bids/my-bids'],
    enabled: !!technician,
  });

  const handlePlaceBid = async (data: any) => {
    try {
      await apiRequest('POST', '/api/bids', data);
      toast({
        title: 'Bid Placed!',
        description: 'Your bid has been submitted successfully.',
      });
      // Invalidate bids query to refresh the list
      if (technician) {
        const { queryClient } = await import('@/lib/queryClient');
        queryClient.invalidateQueries({ queryKey: [`/api/bids/my-bids?technicianId=${technician.id}`] });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to place bid. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleBidOnJob = (jobId: string) => {
    const job = availableJobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setBidModalOpen(true);
    }
  };

  const initials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'T';

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      <div className="space-y-6">
        {loadingProfile ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : technician ? (
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold">{user?.name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{technician.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4" />
                        <span>{technician.experience} years exp.</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <RatingDisplay
                        rating={Number(technician.rating)}
                        totalReviews={technician.totalReviews}
                        size="md"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {technician.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {technician.bio && (
                    <p className="text-muted-foreground">{technician.bio}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:w-48">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-primary">{technician.totalReviews}</div>
                      <div className="text-sm text-muted-foreground mt-1">Reviews</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-primary">{myBids.length}</div>
                      <div className="text-sm text-muted-foreground mt-1">Active Bids</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Complete Your Profile</h3>
              <p className="text-muted-foreground mb-4">
                Add your skills and experience to start receiving job opportunities
              </p>
              <Button>Complete Profile</Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="jobs" data-testid="tab-available-jobs">
              <Briefcase className="h-4 w-4 mr-2" />
              Available Jobs
            </TabsTrigger>
            <TabsTrigger value="bids" data-testid="tab-my-bids">
              <Star className="h-4 w-4 mr-2" />
              My Bids
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Open Jobs in Your Area</CardTitle>
                <CardDescription>
                  Browse and bid on jobs that match your skills
                </CardDescription>
              </CardHeader>
            </Card>

            {loadingJobs ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : availableJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No jobs available</h3>
                  <p className="text-muted-foreground">
                    Check back later for new opportunities
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 space-y-3" data-testid="available-jobs-list">
                  {availableJobs.map((job) => (
                    <DashboardJobCard
                      key={job.id}
                      job={job}
                      onBid={handleBidOnJob}
                    />
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="bids" className="space-y-6 mt-6">
            {loadingBids ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : myBids.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No bids placed yet</h3>
                  <p className="text-muted-foreground">
                    Start bidding on available jobs to grow your business
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4" data-testid="my-bids-list">
                {myBids.map((bid: any) => (
                  <Card key={bid.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{bid.job?.title}</CardTitle>
                          <CardDescription className="mt-1">
                            Bid amount: ₹{Number(bid.amount).toFixed(0)}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={bid.status === 'pending' ? 'secondary' : bid.status === 'accepted' ? 'default' : 'outline'}
                        >
                          {bid.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    {bid.message && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{bid.message}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedJob && technician && (
        <PlaceBidModal
          open={bidModalOpen}
          onClose={() => setBidModalOpen(false)}
          onSubmit={handlePlaceBid}
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
          technicianId={technician.id}
        />
      )}
    </div>
  );
}

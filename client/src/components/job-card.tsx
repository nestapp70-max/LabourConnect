import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, IndianRupee } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { JobWithCustomer } from '@shared/schema';
import { useLanguage } from './language-provider';

interface JobCardProps {
  job: JobWithCustomer;
  onBid?: (jobId: string) => void;
  onViewBids?: (jobId: string) => void;
  isCustomer?: boolean;
}

export function JobCard({ job, onBid, onViewBids, isCustomer }: JobCardProps) {
  const { t } = useLanguage();

  const statusColors = {
    open: 'bg-green-500/10 text-green-500 border-green-500/20',
    assigned: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    completed: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <Card className="hover-elevate" data-testid={`job-card-${job.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate" data-testid={`text-job-title-${job.id}`}>
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
          </div>
          <Badge className={statusColors[job.status as keyof typeof statusColors]}>
            {job.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{job.category}</Badge>
          {job.budget && (
            <Badge variant="secondary" className="gap-1">
              <IndianRupee className="h-3 w-3" />
              {Number(job.budget).toFixed(0)}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {isCustomer ? (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => onViewBids?.(job.id)}
            data-testid={`button-view-bids-${job.id}`}
          >
            {t('job.bids')}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="default"
            className="w-full"
            onClick={() => onBid?.(job.id)}
            disabled={job.status !== 'open'}
            data-testid={`button-bid-${job.id}`}
          >
            {t('bid.place')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

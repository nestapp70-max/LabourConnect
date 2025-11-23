import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { JobWithCustomer } from '@shared/schema';

interface DashboardJobCardProps {
  job: JobWithCustomer;
  isCustomer?: boolean;
  onBid?: (jobId: string) => void;
  onViewBids?: (jobId: string) => void;
}

export function DashboardJobCard({ job, isCustomer, onBid, onViewBids }: DashboardJobCardProps) {
  const [showBidders, setShowBidders] = useState(false);
  const budget = Number(job.budget || 0);
  const budgetDisplay = budget > 0 ? `₹${Math.floor(budget * 0.8)}–${Math.floor(budget * 1.2)}` : 'Negotiable';
  const bidCount = Math.floor(Math.random() * 4) + 1;

  return (
    <div className="rounded-lg border border-border bg-card p-4 hover-elevate transition-all">
      <div className="flex items-start justify-between gap-4">
        {/* Left: Title & Meta */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{job.title}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <span className="text-muted-foreground">{job.customer?.user.name || 'Customer'}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">PIN {job.pinCode}</span>
          </div>
        </div>

        {/* Right: Price & Bid Button */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="text-sm font-semibold text-primary">{budgetDisplay}</div>
          <Button
            size="sm"
            variant="default"
            className="text-xs h-7 px-3"
            onClick={() => {
              if (isCustomer) {
                onViewBids?.(job.id);
              } else {
                onBid?.(job.id);
              }
              setShowBidders(!showBidders);
            }}
            data-testid={`button-${isCustomer ? 'view-bids' : 'bid'}-${job.id}`}
          >
            {isCustomer ? `${bidCount} Bid${bidCount !== 1 ? 's' : ''}` : 'Bid Now'}
          </Button>
        </div>
      </div>

      {/* Bidders List (if showing) */}
      {showBidders && isCustomer && (
        <div className="mt-3 space-y-2 border-t border-border pt-3">
          {[...Array(bidCount)].map((_, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="text-muted-foreground">Technician {i + 1}</div>
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground">₹{Math.floor(budget * (0.8 + Math.random() * 0.4))}</div>
                <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

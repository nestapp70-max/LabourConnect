import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertBidSchema } from '@shared/schema';
import { z } from 'zod';

const bidFormSchema = insertBidSchema;
type BidFormData = z.infer<typeof bidFormSchema>;

interface PlaceBidModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BidFormData) => void;
  jobId: string;
  jobTitle: string;
  technicianId: string;
}

export function PlaceBidModal({ open, onClose, onSubmit, jobId, jobTitle, technicianId }: PlaceBidModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BidFormData>({
    resolver: zodResolver(bidFormSchema),
    defaultValues: {
      jobId,
      technicianId,
      amount: '',
      message: '',
    },
  });

  const handleFormSubmit = (data: BidFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-place-bid">
        <DialogHeader>
          <DialogTitle>Place Your Bid</DialogTitle>
          <DialogDescription>
            Bidding for: <span className="font-medium text-foreground">{jobTitle}</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Bid Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter your bid amount"
              {...register('amount')}
              data-testid="input-bid-amount"
            />
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Why you're the best fit for this job, your approach, timeline..."
              className="min-h-[100px]"
              {...register('message')}
              data-testid="input-bid-message"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel-bid">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1" data-testid="button-submit-bid">
              {isSubmitting ? 'Submitting...' : 'Submit Bid'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

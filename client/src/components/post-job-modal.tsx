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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertJobSchema, LABOUR_CATEGORIES } from '@shared/schema';
import { z } from 'zod';
import { useLanguage } from './language-provider';

const jobFormSchema = insertJobSchema.extend({
  budget: z.string().transform((val) => (val ? val : undefined)),
});

type JobFormData = z.infer<typeof jobFormSchema>;

interface PostJobModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: JobFormData) => void;
  customerId: string;
}

export function PostJobModal({ open, onClose, onSubmit, customerId }: PostJobModalProps) {
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      customerId,
      title: '',
      description: '',
      category: '',
      budget: '',
      location: '',
      pinCode: '',
    },
  });

  const category = watch('category');

  const handleFormSubmit = (data: JobFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-post-job">
        <DialogHeader>
          <DialogTitle>{t('job.post')}</DialogTitle>
          <DialogDescription>
            Post a job to receive bids from skilled technicians in your area.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t('job.title')}</Label>
            <Input
              id="title"
              placeholder="e.g., AC Repair Needed"
              {...register('title')}
              data-testid="input-job-title"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">{t('job.category')}</Label>
            <Select value={category} onValueChange={(value) => setValue('category', value)}>
              <SelectTrigger data-testid="select-job-category">
                <SelectValue placeholder={t('search.category')} />
              </SelectTrigger>
              <SelectContent>
                {LABOUR_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('job.description')}</Label>
            <Textarea
              id="description"
              placeholder="Describe the job requirements, timeline, and any specific details..."
              className="min-h-[100px]"
              {...register('description')}
              data-testid="input-job-description"
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">{t('job.location')}</Label>
              <Input
                id="location"
                placeholder="e.g., Mumbai, Maharashtra"
                {...register('location')}
                data-testid="input-job-location"
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pinCode">PIN Code (Optional)</Label>
              <Input
                id="pinCode"
                placeholder="e.g., 400001"
                {...register('pinCode')}
                data-testid="input-job-pincode"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">{t('job.budget')} (Optional)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="e.g., 2000"
              {...register('budget')}
              data-testid="input-job-budget"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel-job">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1" data-testid="button-submit-job">
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

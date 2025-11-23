import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock, Wallet, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UnlockContactModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  technicianName: string;
  walletBalance: number;
}

export function UnlockContactModal({
  open,
  onClose,
  onConfirm,
  technicianName,
  walletBalance,
}: UnlockContactModalProps) {
  const canAfford = walletBalance >= 10;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-unlock-contact">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Unlock Contact Details
          </DialogTitle>
          <DialogDescription>
            Get direct access to {technicianName}'s phone number and email to connect via WhatsApp or call.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">Unlock Cost</span>
            <span className="text-lg font-bold">₹10</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
            <span className="text-sm font-medium flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Your Balance
            </span>
            <span className={`text-lg font-bold ${canAfford ? 'text-primary' : 'text-destructive'}`}>
              ₹{Number(walletBalance).toFixed(2)}
            </span>
          </div>
          {!canAfford && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Insufficient balance. Please recharge your wallet to unlock this contact.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto" data-testid="button-cancel-unlock">
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={!canAfford}
            className="w-full sm:w-auto"
            data-testid="button-confirm-unlock"
          >
            Unlock for ₹10
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

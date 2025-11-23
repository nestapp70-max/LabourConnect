import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IndianRupee, CreditCard } from 'lucide-react';
import { useLanguage } from './language-provider';

interface RechargeModalProps {
  open: boolean;
  onClose: () => void;
  onRecharge: (amount: number) => void;
}

const RECHARGE_AMOUNTS = [100, 200, 500];

export function RechargeModal({ open, onClose, onRecharge }: RechargeModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-recharge">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t('wallet.recharge')}
          </DialogTitle>
          <DialogDescription>
            Select an amount to recharge your wallet. Each chat unlock costs ₹10.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {RECHARGE_AMOUNTS.map((amount) => (
            <Button
              key={amount}
              size="lg"
              variant="outline"
              className="justify-between h-16 text-lg hover-elevate active-elevate-2"
              onClick={() => {
                onRecharge(amount);
                onClose();
              }}
              data-testid={`button-recharge-${amount}`}
            >
              <span className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                {amount}
              </span>
              <span className="text-sm text-muted-foreground">
                {amount / 10} chat unlocks
              </span>
            </Button>
          ))}
        </div>
        <div className="text-xs text-muted-foreground text-center">
          Payment via Razorpay (UPI, Cards, Wallets)
        </div>
      </DialogContent>
    </Dialog>
  );
}

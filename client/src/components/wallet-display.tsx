import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './language-provider';

interface WalletDisplayProps {
  balance: number;
  onRecharge: () => void;
}

export function WalletDisplay({ balance, onRecharge }: WalletDisplayProps) {
  const { t } = useLanguage();

  return (
    <Button
      variant="outline"
      onClick={onRecharge}
      className="gap-2"
      data-testid="button-wallet"
    >
      <Wallet className="h-4 w-4" />
      <span className="font-semibold">₹{Number(balance).toFixed(2)}</span>
    </Button>
  );
}

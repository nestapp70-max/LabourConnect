import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/language-provider';
import { Phone, Lock, BriefcaseBusiness } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const sendOtpMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      return await apiRequest('POST', '/api/auth/send-otp', { phone: phoneNumber });
    },
    onSuccess: () => {
      setStep('otp');
      toast({
        title: 'OTP Sent',
        description: `Verification code sent to ${phone}`,
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send OTP. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: { phone: string; code: string }) => {
      return await apiRequest('POST', '/api/auth/verify-otp', data);
    },
    onSuccess: (data: any) => {
      localStorage.setItem('user', JSON.stringify(data.user));
      toast({
        title: 'Welcome!',
        description: `Logged in successfully as ${data.user.name}`,
      });
      setLocation('/dashboard');
    },
    onError: () => {
      toast({
        title: 'Invalid OTP',
        description: 'Please check your code and try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      sendOtpMutation.mutate(phone);
    } else {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid 10-digit phone number',
        variant: 'destructive',
      });
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      verifyOtpMutation.mutate({ phone, code: otp });
    } else {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a 6-digit OTP',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <BriefcaseBusiness className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{t('auth.login')}</CardTitle>
          <CardDescription>{t('app.tagline')}</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t('auth.phone')}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10"
                    data-testid="input-phone"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send you a 6-digit OTP to verify your number
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={sendOtpMutation.isPending || phone.length < 10}
                data-testid="button-send-otp"
              >
                {sendOtpMutation.isPending ? 'Sending...' : 'Send OTP'}
              </Button>
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setLocation('/signup')}
                  data-testid="link-signup"
                >
                  Don't have an account? {t('auth.signup')}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">{t('auth.otp')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-10 text-center text-lg tracking-widest"
                    data-testid="input-otp"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  OTP sent to {phone}
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={verifyOtpMutation.isPending || otp.length !== 6}
                data-testid="button-verify-otp"
              >
                {verifyOtpMutation.isPending ? 'Verifying...' : t('auth.verify')}
              </Button>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setStep('phone')}
                  className="p-0"
                  data-testid="button-change-phone"
                >
                  Change number
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => sendOtpMutation.mutate(phone)}
                  className="p-0"
                  data-testid="button-resend-otp"
                >
                  {t('auth.resend')}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

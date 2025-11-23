import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/language-provider';
import { Phone, Lock, User, BriefcaseBusiness } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'customer' as 'customer' | 'technician',
  });
  const [otp, setOtp] = useState('');

  const signupMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest('POST', '/api/auth/signup', data);
    },
    onSuccess: () => {
      setStep('otp');
      toast({
        title: 'OTP Sent',
        description: `Verification code sent to ${formData.phone}`,
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
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
        description: `Account created successfully for ${data.user.name}`,
      });
      setLocation(data.user.role === 'technician' ? '/technician/profile' : '/dashboard');
    },
    onError: () => {
      toast({
        title: 'Invalid OTP',
        description: 'Please check your code and try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone.length >= 10) {
      signupMutation.mutate(formData);
    } else {
      toast({
        title: 'Invalid details',
        description: 'Please fill all required fields correctly',
        variant: 'destructive',
      });
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      verifyOtpMutation.mutate({ phone: formData.phone, code: otp });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <BriefcaseBusiness className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{t('auth.signup')}</CardTitle>
          <CardDescription>Join thousands of users across India</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'details' ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                    data-testid="input-name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('auth.phone')}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    className="pl-10"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>I am a</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value: 'customer' | 'technician') => setFormData({ ...formData, role: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value="customer" id="customer" data-testid="radio-customer" />
                    <Label htmlFor="customer" className="flex-1 cursor-pointer">
                      <div className="font-medium">{t('role.customer')}</div>
                      <div className="text-xs text-muted-foreground">Looking to hire labour/technicians</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value="technician" id="technician" data-testid="radio-technician" />
                    <Label htmlFor="technician" className="flex-1 cursor-pointer">
                      <div className="font-medium">{t('role.technician')}</div>
                      <div className="text-xs text-muted-foreground">Offering my services and skills</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={signupMutation.isPending}
                data-testid="button-signup"
              >
                {signupMutation.isPending ? 'Creating account...' : 'Continue'}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setLocation('/login')}
                  data-testid="link-login"
                >
                  Already have an account? {t('auth.login')}
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
                  OTP sent to {formData.phone}
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
                  onClick={() => setStep('details')}
                  className="p-0"
                >
                  Go back
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => signupMutation.mutate(formData)}
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

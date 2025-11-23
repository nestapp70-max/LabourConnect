import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from './language-toggle';
import { WalletDisplay } from './wallet-display';
import { useLanguage } from './language-provider';
import { Menu, BriefcaseBusiness } from 'lucide-react';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface AppHeaderProps {
  walletBalance?: number;
  onRecharge?: () => void;
  onLogout?: () => void;
  userName?: string;
  userRole?: string;
}

export function AppHeader({ walletBalance, onRecharge, onLogout, userName, userRole }: AppHeaderProps) {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <BriefcaseBusiness className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">{t('app.name')}</h1>
              <p className="text-xs text-muted-foreground hidden md:block">{t('app.tagline')}</p>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="link-home">
              {t('nav.home')}
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" data-testid="link-dashboard">
              {t('nav.dashboard')}
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {walletBalance !== undefined && onRecharge && (
            <WalletDisplay balance={walletBalance} onRecharge={onRecharge} />
          )}
          <LanguageToggle />
          
          {userName ? (
            <Button variant="outline" size="sm" onClick={onLogout} data-testid="button-logout">
              {t('auth.logout')}
            </Button>
          ) : (
            <Link href="/login">
              <Button size="sm" data-testid="button-login">
                {t('auth.login')}
              </Button>
            </Link>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t('app.name')}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6">
                <Link href="/">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    {t('nav.home')}
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                    {t('nav.dashboard')}
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { RatingDisplay } from './rating-display';
import { useLanguage } from './language-provider';
import type { TechnicianWithUser } from '@shared/schema';

interface TechnicianCardProps {
  technician: TechnicianWithUser;
  onUnlockContact: (technicianId: string) => void;
  isUnlocked?: boolean;
}

export function TechnicianCard({ technician, onUnlockContact, isUnlocked }: TechnicianCardProps) {
  const { t } = useLanguage();
  const initials = technician.user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="hover-elevate" data-testid={`technician-card-${technician.id}`}>
      <CardHeader className="space-y-0 pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate" data-testid={`text-technician-name-${technician.id}`}>
              {technician.user.name}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-0.5">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{technician.location}</span>
            </div>
            <div className="mt-1.5">
              <RatingDisplay
                rating={Number(technician.rating)}
                totalReviews={technician.totalReviews}
                size="sm"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            {technician.experience} {technician.experience === 1 ? 'year' : 'years'} experience
          </div>
          <div className="flex flex-wrap gap-1.5">
            {technician.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {technician.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{technician.skills.length - 3} more
              </Badge>
            )}
          </div>
          {technician.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {technician.bio}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 gap-2">
        {isUnlocked ? (
          <>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => technician.user.phone && window.open(`tel:${technician.user.phone}`)}
              data-testid={`button-call-${technician.id}`}
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </Button>
            <Button
              size="sm"
              variant="default"
              className="flex-1 gap-2"
              onClick={() => technician.user.phone && window.open(`https://wa.me/91${technician.user.phone.replace(/\D/g, '')}`)}
              data-testid={`button-whatsapp-${technician.id}`}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="default"
            className="w-full gap-2"
            onClick={() => onUnlockContact(technician.id)}
            data-testid={`button-unlock-${technician.id}`}
          >
            {t('chat.unlockCost')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

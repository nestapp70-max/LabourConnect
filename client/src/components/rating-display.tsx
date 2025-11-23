import { Star, StarHalf } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  totalReviews?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingDisplay({ rating, totalReviews = 0, showCount = true, size = 'sm' }: RatingDisplayProps) {
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={`${sizeClasses[size]} fill-yellow-500 text-yellow-500`} />
        ))}
        {hasHalfStar && (
          <StarHalf className={`${sizeClasses[size]} fill-yellow-500 text-yellow-500`} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={`${sizeClasses[size]} text-muted`} />
        ))}
      </div>
      <span className={`${textSizeClasses[size]} font-medium`}>
        {rating.toFixed(1)}
      </span>
      {showCount && totalReviews > 0 && (
        <span className={`${textSizeClasses[size]} text-muted-foreground`}>
          ({totalReviews})
        </span>
      )}
    </div>
  );
}

import { LABOUR_CATEGORIES } from '@shared/schema';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCategorySliderProps {
  selectedCategory?: string;
  onCategorySelect: (categoryId: string) => void;
}

export function ServiceCategorySlider({ selectedCategory, onCategorySelect }: ServiceCategorySliderProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-3 pb-4">
        {LABOUR_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;
          const IconComponent = (Icons as any)[category.icon.split('-').map((word: string) => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join('')] || Icons.Wrench;

          return (
            <Card
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={cn(
                'flex-shrink-0 w-24 h-24 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover-elevate active-elevate-2',
                isSelected && 'ring-2 ring-primary bg-primary/5'
              )}
              data-testid={`category-${category.id}`}
            >
              <IconComponent className={cn('h-6 w-6', isSelected && 'text-primary')} />
              <span className={cn('text-xs text-center px-1', isSelected && 'text-primary font-medium')}>
                {category.name.split(' ')[0]}
              </span>
            </Card>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

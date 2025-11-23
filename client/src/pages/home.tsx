import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Users, Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { ServiceCategorySlider } from '@/components/service-category-slider';
import { VoiceSearch } from '@/components/voice-search';
import { LABOUR_CATEGORIES } from '@shared/schema';

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.set('location', searchLocation);
    if (selectedCategory) params.set('category', selectedCategory);
    setLocation(`/dashboard?${params.toString()}`);
  };

  const handleVoiceResult = (text: string) => {
    setSearchLocation(text);
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-background via-primary/5 to-background border-b">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Find Skilled Labour &
                <span className="text-primary block">Technicians Near You</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with certified local professionals across India for construction, household, technical services, and more
              </p>
            </div>

            <Card className="border-2" data-testid="search-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder={t('search.placeholder')}
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-11 h-12 text-base"
                      data-testid="input-search-location"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-64 h-12" data-testid="select-search-category">
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
                  <VoiceSearch onResult={handleVoiceResult} className="w-full md:w-auto h-12" />
                  <Button
                    size="lg"
                    onClick={handleSearch}
                    className="gap-2 h-12"
                    data-testid="button-search"
                  >
                    <Search className="h-5 w-5" />
                    {t('search.find')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { icon: Users, label: '50,000+', subtitle: 'Registered Workers' },
                { icon: CheckCircle, label: '1,00,000+', subtitle: 'Jobs Completed' },
                { icon: Star, label: '4.8/5', subtitle: 'Average Rating' },
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <stat.icon className="h-8 w-8 mx-auto text-primary" />
                  <div className="text-2xl md:text-3xl font-bold">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Browse by Category</h2>
            <p className="text-muted-foreground">Find skilled workers for any type of work</p>
          </div>
          <ServiceCategorySlider
            selectedCategory={activeCategory}
            onCategorySelect={(categoryId) => {
              setActiveCategory(categoryId);
              setSelectedCategory(categoryId);
            }}
          />
        </div>
      </section>

      <section className="bg-muted/50 border-y">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {[
                {
                  step: '1',
                  title: 'Post Your Job',
                  description: 'Describe what work you need done and where',
                },
                {
                  step: '2',
                  title: 'Get Bids',
                  description: 'Receive bids from qualified technicians in your area',
                },
                {
                  step: '3',
                  title: 'Connect & Hire',
                  description: 'Unlock contact details for ₹10 and connect directly',
                },
              ].map((item) => (
                <Card key={item.step}>
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="pt-6">
              <Button size="lg" onClick={() => setLocation('/signup')} data-testid="button-get-started">
                Get Started - It's Free
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

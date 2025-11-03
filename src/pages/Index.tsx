import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Beer {
  id: number;
  name: string;
  brewery: string;
  style: string;
  abv: number;
  rating: number;
  reviews: number;
  image: string;
}

interface Bar {
  id: number;
  name: string;
  location: string;
  rating: number;
  beersCount: number;
}

interface Post {
  id: number;
  user: string;
  avatar: string;
  time: string;
  type: 'beer' | 'bar';
  itemName: string;
  rating: number;
  text: string;
  likes: number;
}

interface User {
  name: string;
  username: string;
  avatar: string;
  beersChecked: number;
  barsVisited: number;
  friends: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('feed');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const currentUser: User = {
    name: 'Алексей Петров',
    username: '@alex_beer',
    avatar: '🍺',
    beersChecked: 127,
    barsVisited: 43,
    friends: 89
  };

  const topBeers: Beer[] = [
    { id: 1, name: 'IPA Космонавт', brewery: 'Brewery Cosmos', style: 'IPA', abv: 6.5, rating: 4.7, reviews: 342, image: '🚀' },
    { id: 2, name: 'Темный Эль', brewery: 'Пивоварня Сибирь', style: 'Porter', abv: 5.8, rating: 4.6, reviews: 289, image: '🌙' },
    { id: 3, name: 'Wheat Heaven', brewery: 'Золотой Хмель', style: 'Wheat', abv: 5.2, rating: 4.5, reviews: 256, image: '🌾' },
    { id: 4, name: 'Stout Imperial', brewery: 'Dark Brewery', style: 'Stout', abv: 9.0, rating: 4.8, reviews: 412, image: '⚫' },
    { id: 5, name: 'Lager Classic', brewery: 'Классика', style: 'Lager', abv: 4.8, rating: 4.3, reviews: 198, image: '🍻' },
    { id: 6, name: 'Pale Ale Sunset', brewery: 'Sunset Brewery', style: 'Pale Ale', abv: 5.5, rating: 4.4, reviews: 223, image: '🌅' },
  ];

  const topBars: Bar[] = [
    { id: 1, name: 'Craft Bar "Хмель"', location: 'Москва, Арбат', rating: 4.8, beersCount: 150 },
    { id: 2, name: 'Beer Point', location: 'СПб, Невский пр.', rating: 4.6, beersCount: 120 },
    { id: 3, name: 'Пивная №1', location: 'Екатеринбург', rating: 4.5, beersCount: 95 },
  ];

  const feedPosts: Post[] = [
    {
      id: 1,
      user: 'Мария Иванова',
      avatar: '👩',
      time: '2 часа назад',
      type: 'beer',
      itemName: 'IPA Космонавт',
      rating: 5,
      text: 'Невероятный баланс хмеля и солода! Цитрусовые ноты просто взрывают вкусовые рецепторы. Обязательно попробуйте!',
      likes: 24
    },
    {
      id: 2,
      user: 'Дмитрий Соколов',
      avatar: '👨',
      time: '5 часов назад',
      type: 'bar',
      itemName: 'Craft Bar "Хмель"',
      rating: 5,
      text: 'Лучший бар в городе! Огромный выбор крафтового пива, отличная атмосфера и приветливый персонал.',
      likes: 18
    },
    {
      id: 3,
      user: 'Анна Смирнова',
      avatar: '👱‍♀️',
      time: '1 день назад',
      type: 'beer',
      itemName: 'Stout Imperial',
      rating: 4,
      text: 'Плотный, насыщенный стаут с нотами шоколада и кофе. Идеально для холодного вечера.',
      likes: 31
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= rating ? 'fill-secondary text-secondary' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const AuthDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-accent font-semibold">
          <Icon name="LogIn" size={20} className="mr-2" />
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добро пожаловать в BeerHub! 🍺</DialogTitle>
          <DialogDescription>Войдите, чтобы делиться впечатлениями о пиве</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button onClick={() => setIsAuthenticated(true)} className="w-full">
            Войти
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Нет аккаунта? <span className="text-primary font-semibold cursor-pointer">Зарегистрироваться</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AddPostDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-accent font-semibold">
          <Icon name="Plus" size={20} className="mr-2" />
          Добавить отзыв
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Добавить отзыв</DialogTitle>
          <DialogDescription>Поделитесь впечатлениями о пиве или баре</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Тип отзыва</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beer">🍺 Пиво</SelectItem>
                <SelectItem value="bar">🏪 Бар/Заведение</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Название</Label>
            <Input placeholder="Название пива или бара" />
          </div>
          <div className="space-y-2">
            <Label>Оценка</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={32}
                  className="cursor-pointer text-gray-300 hover:text-secondary transition-colors"
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Ваш отзыв</Label>
            <Textarea placeholder="Расскажите о вкусе, аромате, впечатлениях..." rows={4} />
          </div>
          <Button className="w-full">Опубликовать</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🍺</div>
              <div>
                <h1 className="text-2xl font-bold text-accent">BeerHub</h1>
                <p className="text-xs text-muted-foreground">Социальная сеть для любителей пива</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск пива, баров, людей..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="icon">
                    <Icon name="Bell" size={20} />
                  </Button>
                  <Avatar className="cursor-pointer hover:ring-2 ring-primary transition-all">
                    <AvatarFallback className="bg-primary text-accent text-2xl">
                      {currentUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                </>
              ) : (
                <AuthDialog />
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <section className="mb-12 animate-fade-in">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent via-primary to-secondary p-12 text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  Откройте мир крафтового пива
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Делитесь отзывами, находите новые сорта, открывайте лучшие бары и общайтесь с единомышленниками
                </p>
                <div className="flex gap-4 justify-center">
                  <AuthDialog />
                </div>
              </div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZ2LTZoNnYtNmg2djZoNnY2aC02djZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            </div>
          </section>
        ) : null}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-scale-in">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-md">
            <TabsTrigger value="feed" className="data-[state=active]:bg-primary data-[state=active]:text-accent">
              <Icon name="Home" size={18} className="mr-2" />
              Лента
            </TabsTrigger>
            <TabsTrigger value="beers" className="data-[state=active]:bg-primary data-[state=active]:text-accent">
              <Icon name="Wine" size={18} className="mr-2" />
              Пиво
            </TabsTrigger>
            <TabsTrigger value="bars" className="data-[state=active]:bg-primary data-[state=active]:text-accent">
              <Icon name="MapPin" size={18} className="mr-2" />
              Бары
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-accent">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {isAuthenticated && (
              <Card className="shadow-lg border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-accent text-xl">
                          {currentUser.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Что попробовали сегодня?</p>
                        <p className="text-xs text-muted-foreground">Поделитесь впечатлениями</p>
                      </div>
                    </div>
                    <AddPostDialog />
                  </div>
                </CardHeader>
              </Card>
            )}

            {feedPosts.map((post) => (
              <Card key={post.id} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-muted text-2xl">{post.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{post.user}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Icon name={post.type === 'beer' ? 'Wine' : 'MapPin'} size={12} className="mr-1" />
                      {post.type === 'beer' ? 'Пиво' : 'Бар'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-accent">{post.itemName}</h3>
                    {renderStars(post.rating)}
                  </div>
                  <p className="text-foreground leading-relaxed">{post.text}</p>
                  <div className="flex items-center gap-6 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon name="Heart" size={18} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon name="MessageCircle" size={18} />
                      Комментировать
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon name="Share2" size={18} />
                      Поделиться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="beers">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-accent">Топ пива</h2>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="reviews">По отзывам</SelectItem>
                  <SelectItem value="abv">По крепости</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topBeers.map((beer) => (
                <Card key={beer.id} className="shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-300">
                    {beer.image}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{beer.name}</CardTitle>
                        <CardDescription className="font-medium">{beer.brewery}</CardDescription>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">{beer.abv}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Badge variant="outline">{beer.style}</Badge>
                    <div className="flex items-center justify-between">
                      {renderStars(Math.round(beer.rating))}
                      <span className="text-lg font-bold text-accent">{beer.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Icon name="MessageSquare" size={14} className="inline mr-1" />
                      {beer.reviews} отзывов
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bars">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-accent mb-2">Лучшие бары</h2>
              <p className="text-muted-foreground">Откройте для себя места с отличным выбором пива</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topBars.map((bar) => (
                <Card key={bar.id} className="shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="h-40 bg-gradient-to-br from-accent to-primary/80 flex items-center justify-center text-7xl">
                    🏪
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{bar.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Icon name="MapPin" size={14} />
                      {bar.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      {renderStars(Math.round(bar.rating))}
                      <span className="text-lg font-bold text-accent">{bar.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Icon name="Wine" size={14} className="inline mr-1" />
                      {bar.beersCount} сортов пива
                    </p>
                    <Button className="w-full" variant="outline">
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            {isAuthenticated ? (
              <div className="space-y-6">
                <Card className="shadow-xl">
                  <div className="h-32 bg-gradient-to-r from-accent via-primary to-secondary"></div>
                  <CardHeader className="-mt-16">
                    <div className="flex items-end gap-6">
                      <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                        <AvatarFallback className="bg-primary text-accent text-6xl">
                          {currentUser.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 pb-2">
                        <h2 className="text-3xl font-bold text-accent">{currentUser.name}</h2>
                        <p className="text-muted-foreground">{currentUser.username}</p>
                      </div>
                      <Button variant="outline" className="mb-2">
                        <Icon name="Settings" size={18} className="mr-2" />
                        Настройки
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 py-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">{currentUser.beersChecked}</p>
                        <p className="text-sm text-muted-foreground mt-1">Пива попробовано</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">{currentUser.barsVisited}</p>
                        <p className="text-sm text-muted-foreground mt-1">Баров посещено</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">{currentUser.friends}</p>
                        <p className="text-sm text-muted-foreground mt-1">Друзей</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Недавняя активность</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                      Здесь будет отображаться ваша активность
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="py-12 text-center">
                  <Icon name="User" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-2xl font-bold mb-2">Войдите, чтобы увидеть профиль</h3>
                  <p className="text-muted-foreground mb-6">
                    Создайте аккаунт и начните делиться впечатлениями о пиве
                  </p>
                  <AuthDialog />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-accent text-accent-foreground mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🍺</span>
            <h3 className="text-2xl font-bold">BeerHub</h3>
          </div>
          <p className="text-accent-foreground/80 mb-4">
            Социальная сеть для ценителей пива
          </p>
          <div className="flex gap-6 justify-center text-sm">
            <a href="#" className="hover:text-secondary transition-colors">О проекте</a>
            <a href="#" className="hover:text-secondary transition-colors">Правила</a>
            <a href="#" className="hover:text-secondary transition-colors">Контакты</a>
            <a href="#" className="hover:text-secondary transition-colors">API</a>
          </div>
          <p className="text-sm text-accent-foreground/60 mt-6">
            © 2024 BeerHub. Пейте ответственно 🍻
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { games, developers, publishers } from "@/data/gameData";

const Statistics = () => {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const maxPrice = Math.max(...games.map((g) => g.price));
    const countryCounts = developers.reduce(
      (acc, dev) => {
        acc[dev.country] = (acc[dev.country] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const genreStats = games.reduce(
      (acc, game) => {
        acc[game.genre] = (acc[game.genre] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      gamesCount: games.length,
      developersCount: developers.length,
      publishersCount: publishers.length,
      maxPrice,
      countryCounts,
      genreStats,
      avgRating: (
        games.reduce((sum, g) => sum + g.rating, 0) / games.length
      ).toFixed(1),
      crossPlatformCount: games.filter((g) => g.crossPlatform).length,
      multiplayerCount: games.filter((g) => g.multiplayer).length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Статистика</h1>
            <p className="text-gray-600">Динамическая аналитика базы данных</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Icon name="Gamepad2" size={16} className="text-blue-600" />
                Всего игр
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.gamesCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Icon name="Users" size={16} className="text-green-600" />
                Разработчиков
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.developersCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Icon name="Building" size={16} className="text-purple-600" />
                Издателей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishersCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Icon name="DollarSign" size={16} className="text-red-600" />
                Макс. цена
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.maxPrice}₽</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Globe" size={20} className="text-blue-600" />
                Разработчики по странам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.countryCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([country, count]) => (
                    <div
                      key={country}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">{country}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Tag" size={20} className="text-green-600" />
                Популярные жанры
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.genreStats)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 8)
                  .map(([genre, count]) => (
                    <div
                      key={genre}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">{genre}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

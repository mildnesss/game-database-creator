import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useGameData } from "@/contexts/GameDataContext";

const PriceSearch = () => {
  const navigate = useNavigate();
  const { games, developers, publishers } = useGameData();
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");

  const priceOptions = useMemo(() => {
    const prices = [...new Set(games.map((g) => g.price))].sort(
      (a, b) => a - b,
    );
    return prices;
  }, []);

  const filteredGames = useMemo(() => {
    if (!priceFrom && !priceTo) return [];

    const from = priceFrom ? parseInt(priceFrom) : 0;
    const to = priceTo ? parseInt(priceTo) : Infinity;

    return games.filter((game) => game.price >= from && game.price <= to);
  }, [priceFrom, priceTo]);

  const getDeveloperName = (id: number) =>
    developers.find((d) => d.id === id)?.name || "Unknown";
  const getPublisherName = (id: number) =>
    publishers.find((p) => p.id === id)?.name || "Unknown";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Поиск по стоимости
            </h1>
            <p className="text-gray-600">Поиск игр в заданном диапазоне цен</p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="DollarSign" size={24} className="text-green-600" />
              Поиск по диапазону цен
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Цена от
                </label>
                <Select value={priceFrom} onValueChange={setPriceFrom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите минимальную цену" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceOptions.map((price) => (
                      <SelectItem key={price} value={price.toString()}>
                        {price === 0 ? "Бесплатно" : `${price}₽`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Цена до
                </label>
                <Select value={priceTo} onValueChange={setPriceTo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите максимальную цену" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceOptions.map((price) => (
                      <SelectItem key={price} value={price.toString()}>
                        {price === 0 ? "Бесплатно" : `${price}₽`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => {
                  setPriceFrom("");
                  setPriceTo("");
                }}
              >
                <Icon name="X" size={16} className="mr-2" />
                Очистить
              </Button>
            </div>
          </CardContent>
        </Card>

        {filteredGames.length > 0 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Найдено игр: {filteredGames.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{game.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {game.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {game.genre}
                          </span>
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {game.year}
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {getDeveloperName(game.developerId)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {game.price === 0 ? "Бесплатно" : `${game.price}₽`}
                        </div>
                        <div className="text-sm text-gray-600">
                          ⭐ {game.rating}/10
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PriceSearch;

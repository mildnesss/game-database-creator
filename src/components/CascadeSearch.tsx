import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useGameData } from "@/contexts/GameDataContext";
import { Game } from "@/data/gameData";

interface CascadeSearchProps {
  games: Game[];
}

const genres = [
  "RPG",
  "Action",
  "Shooter",
  "Puzzle",
  "Adventure",
  "Platformer",
  "Sports",
  "Simulation",
  "Horror",
  "Survival",
  "Metroidvania",
  "JRPG",
  "Roguelike",
  "Social",
  "Party",
  "Sandbox",
];

const CascadeSearch = ({ games }: CascadeSearchProps) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Доступные годы для выбранного жанра
  const availableYears = useMemo(() => {
    if (!selectedGenre) {
      return Array.from(new Set(games.map((g) => g.year))).sort(
        (a, b) => b - a,
      );
    }
    return Array.from(
      new Set(
        games.filter((g) => g.genre === selectedGenre).map((g) => g.year),
      ),
    ).sort((a, b) => b - a);
  }, [selectedGenre, games]);

  // Доступные жанры для выбранного года
  const availableGenres = useMemo(() => {
    if (!selectedYear) {
      return genres.filter((genre) => games.some((g) => g.genre === genre));
    }
    return genres.filter((genre) =>
      games.some((g) => g.genre === genre && g.year === parseInt(selectedYear)),
    );
  }, [selectedYear, games]);

  // Отфильтрованные игры
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const genreMatch = !selectedGenre || game.genre === selectedGenre;
      const yearMatch = !selectedYear || game.year === parseInt(selectedYear);
      return genreMatch && yearMatch;
    });
  }, [selectedGenre, selectedYear, games]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    // Сброс года если он недоступен для нового жанра
    if (
      selectedYear &&
      !games.some((g) => g.genre === genre && g.year === parseInt(selectedYear))
    ) {
      setSelectedYear("");
    }
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    // Сброс жанра если он недоступен для нового года
    if (
      selectedGenre &&
      !games.some((g) => g.year === parseInt(year) && g.genre === selectedGenre)
    ) {
      setSelectedGenre("");
    }
  };

  const clearFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
  };

  return (
    <div className="space-y-6">
      {/* Форма фильтров */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Filter" size={20} className="text-purple-600" />
            Фильтры поиска
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Жанр</label>
              <Select value={selectedGenre} onValueChange={handleGenreChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите жанр" />
                </SelectTrigger>
                <SelectContent>
                  {availableGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Год</label>
              <Select value={selectedYear} onValueChange={handleYearChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите год" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {(selectedGenre || selectedYear) && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <Icon name="X" size={16} className="mr-1" />
                Сбросить фильтры
              </Button>
              <span className="text-sm text-gray-600">
                Найдено игр: {filteredGames.length}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Результаты поиска */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Результаты поиска ({filteredGames.length})
        </h3>

        {filteredGames.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Icon
                name="SearchX"
                size={48}
                className="text-gray-400 mx-auto mb-2"
              />
              <p className="text-gray-600">
                {selectedGenre || selectedYear
                  ? "Игры не найдены по выбранным критериям"
                  : "Выберите фильтры для поиска игр"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGames.map((game) => (
              <Card key={game.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold line-clamp-1">{game.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                        {game.genre}
                      </span>
                      <span>{game.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {game.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <Icon
                          name="Star"
                          size={14}
                          className="text-yellow-500 fill-current"
                        />
                        <span className="text-sm">{game.rating}</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {game.price > 0 ? `$${game.price}` : "Бесплатно"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CascadeSearch;

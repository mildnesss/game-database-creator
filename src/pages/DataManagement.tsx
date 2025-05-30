import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import {
  games as initialGames,
  developers as initialDevelopers,
  publishers as initialPublishers,
  Game,
  Developer,
  Publisher,
} from "@/data/gameData";

const DataManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"games" | "developers" | "publishers">("games");
  
  // Используем состояние для всех данных
  const [gamesData, setGamesData] = useState<Game[]>(initialGames);
  const [developersData, setDevelopersData] = useState<Developer[]>(initialDevelopers);
  const [publishersData, setPublishersData] = useState<Publisher[]>(initialPublishers);
  
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null);
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(null);

  // Полностью переписанные обработчики сохранения
  const handleSaveGame = (game: Game) => {
    if (game.id === 0) {
      // Добавление новой игры
      const newId = Math.max(0, ...gamesData.map(g => g.id)) + 1;
      setGamesData([...gamesData, { ...game, id: newId }]);
    } else {
      // Обновление существующей игры
      setGamesData(gamesData.map(g => g.id === game.id ? game : g));
    }
    setEditingGame(null);
  };

  const handleSaveDeveloper = (developer: Developer) => {
    if (developer.id === 0) {
      const newId = Math.max(0, ...developersData.map(d => d.id)) + 1;
      setDevelopersData([...developersData, { ...developer, id: newId }]);
    } else {
      setDevelopersData(developersData.map(d => d.id === developer.id ? developer : d));
    }
    setEditingDeveloper(null);
  };

  const handleSavePublisher = (publisher: Publisher) => {
    if (publisher.id === 0) {
      const newId = Math.max(0, ...publishersData.map(p => p.id)) + 1;
      setPublishersData([...publishersData, { ...publisher, id: newId }]);
    } else {
      setPublishersData(publishersData.map(p => p.id === publisher.id ? publisher : p));
    }
    setEditingPublisher(null);
  };

  // Обработчики удаления
  const handleDeleteGame = (id: number) => setGamesData(gamesData.filter(g => g.id !== id));
  const handleDeleteDeveloper = (id: number) => setDevelopersData(developersData.filter(d => d.id !== id));
  const handleDeletePublisher = (id: number) => setPublishersData(publishersData.filter(p => p.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        {/* Заголовок и кнопка назад */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Ввод и редактирование данных</h1>
            <p className="text-gray-600">Управление играми, разработчиками и издателями</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Табы */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setActiveTab("games")}
              variant={activeTab === "games" ? "default" : "outline"}
            >
              Игры ({gamesData.length})
            </Button>
            <Button
              onClick={() => setActiveTab("developers")}
              variant={activeTab === "developers" ? "default" : "outline"}
            >
              Разработчики ({developersData.length})
            </Button>
            <Button
              onClick={() => setActiveTab("publishers")}
              variant={activeTab === "publishers" ? "default" : "outline"}
            >
              Издатели ({publishersData.length})
            </Button>
          </div>

          {/* Содержимое табов */}
          {activeTab === "games" && (
            <div className="grid gap-4">
              <Button onClick={() => setEditingGame({
                id: 0,
                title: "",
                description: "",
                developerId: 1,
                publisherId: 1,
                year: new Date().getFullYear(),
                genre: "",
                rating: 0,
                userRating: 0,
                price: 0,
                link: "",
                crossPlatform: false,
                multiplayer: false
              })}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить игру
              </Button>

              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {gamesData.map(game => (
                  <Card key={game.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{game.title}</h3>
                        <p className="text-sm text-gray-600">
                          {game.genre} • {game.year} • {game.price}₽
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setEditingGame(game)}>
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteGame(game.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Аналогично для developers и publishers */}
          {activeTab === "developers" && (
            <div className="grid gap-4">
              <Button onClick={() => setEditingDeveloper({
                id: 0,
                name: "",
                description: "",
                country: ""
              })}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить разработчика
              </Button>

              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {developersData.map(developer => (
                  <Card key={developer.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{developer.name}</h3>
                        <p className="text-sm text-gray-600">{developer.country}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setEditingDeveloper(developer)}>
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteDeveloper(developer.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "publishers" && (
            <div className="grid gap-4">
              <Button onClick={() => setEditingPublisher({
                id: 0,
                name: "",
                description: "",
                location: ""
              })}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить издателя
              </Button>

              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {publishersData.map(publisher => (
                  <Card key={publisher.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{publisher.name}</h3>
                        <p className="text-sm text-gray-600">{publisher.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setEditingPublisher(publisher)}>
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePublisher(publisher.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Модальные окна редактирования */}
        {editingGame && (
          <GameEditModal
            game={editingGame}
            onSave={handleSaveGame}
            onCancel={() => setEditingGame(null)}
            developers={developersData}
            publishers={publishersData}
          />
        )}

        {editingDeveloper && (
          <DeveloperEditModal
            developer={editingDeveloper}
            onSave={handleSaveDeveloper}
            onCancel={() => setEditingDeveloper(null)}
          />
        )}

        {editingPublisher && (
          <PublisherEditModal
            publisher={editingPublisher}
            onSave={handleSavePublisher}
            onCancel={() => setEditingPublisher(null)}
          />
        )}
      </div>
    </div>
  );
};

// Вынесенные компоненты модальных окон
const GameEditModal = ({ game, onSave, onCancel, developers, publishers }: {
  game: Game;
  onSave: (game: Game) => void;
  onCancel: () => void;
  developers: Developer[];
  publishers: Publisher[];
}) => {
  const [editedGame, setEditedGame] = useState<Game>(game);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{game.id === 0 ? "Добавление игры" : "Редактирование игры"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Название</Label>
              <Input
                value={editedGame.title}
                onChange={(e) => setEditedGame({...editedGame, title: e.target.value})}
              />
            </div>
            <div>
              <Label>Жанр</Label>
              <Input
                value={editedGame.genre}
                onChange={(e) => setEditedGame({...editedGame, genre: e.target.value})}
              />
            </div>
            <div>
              <Label>Год</Label>
              <Input
                type="number"
                value={editedGame.year}
                onChange={(e) => setEditedGame({...editedGame, year: +e.target.value})}
              />
            </div>
            <div>
              <Label>Цена (₽)</Label>
              <Input
                type="number"
                value={editedGame.price}
                onChange={(e) => setEditedGame({...editedGame, price: +e.target.value})}
              />
            </div>
            <div>
              <Label>Разработчик</Label>
              <Select
                value={editedGame.developerId.toString()}
                onValueChange={(value) => setEditedGame({...editedGame, developerId: +value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите разработчика" />
                </SelectTrigger>
                <SelectContent>
                  {developers.map(dev => (
                    <SelectItem key={dev.id} value={dev.id.toString()}>
                      {dev.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Издатель</Label>
              <Select
                value={editedGame.publisherId.toString()}
                onValueChange={(value) => setEditedGame({...editedGame, publisherId: +value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите издателя" />
                </SelectTrigger>
                <SelectContent>
                  {publishers.map(pub => (
                    <SelectItem key={pub.id} value={pub.id.toString()}>
                      {pub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea
              value={editedGame.description}
              onChange={(e) => setEditedGame({...editedGame, description: e.target.value})}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={editedGame.crossPlatform}
                onCheckedChange={(checked) => setEditedGame({...editedGame, crossPlatform: !!checked})}
              />
              <Label>Кроссплатформенность</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={editedGame.multiplayer}
                onCheckedChange={(checked) => setEditedGame({...editedGame, multiplayer: !!checked})}
              />
              <Label>Мультиплеер</Label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onSave(editedGame)}>
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Аналогичные компоненты для DeveloperEditModal и PublisherEditModal
// ... (реализовать по аналогии с GameEditModal)

export default DataManagement;

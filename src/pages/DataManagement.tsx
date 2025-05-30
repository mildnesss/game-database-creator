import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useGameData } from "@/contexts/GameDataContext";
import { Game, Developer, Publisher } from "@/data/gameData";

const DataManagement = () => {
  const navigate = useNavigate();
  const {
    games,
    developers,
    publishers,
    addGame,
    updateGame,
    deleteGame,
    addDeveloper,
    updateDeveloper,
    deleteDeveloper,
    addPublisher,
    updatePublisher,
    deletePublisher,
  } = useGameData();

  const [activeTab, setActiveTab] = useState<
    "games" | "developers" | "publishers"
  >("games");
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(
    null,
  );
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(
    null,
  );

  // Обработчики для игр
  const handleSaveGame = (game: Game) => {
    if (game.id === 0) {
      addGame(game);
    } else {
      updateGame(game);
    }
    setEditingGame(null);
  };

  const handleDeleteGame = (id: number) => {
    deleteGame(id);
  };

  // Обработчики для разработчиков
  const handleSaveDeveloper = (developer: Developer) => {
    if (developer.id === 0) {
      addDeveloper(developer);
    } else {
      updateDeveloper(developer);
    }
    setEditingDeveloper(null);
  };

  const handleDeleteDeveloper = (id: number) => {
    deleteDeveloper(id);
  };

  // Обработчики для издателей
  const handleSavePublisher = (publisher: Publisher) => {
    if (publisher.id === 0) {
      addPublisher(publisher);
    } else {
      updatePublisher(publisher);
    }
    setEditingPublisher(null);
  };

  const handleDeletePublisher = (id: number) => {
    deletePublisher(id);
  };

  // Компонент формы редактирования игры
  const GameEditForm = () => {
    if (!editingGame) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>
              {editingGame.id ? "Редактировать игру" : "Добавить игру"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Название</Label>
                <Input
                  value={editingGame.title}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Жанр</Label>
                <Input
                  value={editingGame.genre}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, genre: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Год</Label>
                <Input
                  type="number"
                  value={editingGame.year}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, year: +e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Цена</Label>
                <Input
                  type="number"
                  value={editingGame.price}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, price: +e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Разработчик</Label>
                <Select
                  value={editingGame.developerId.toString()}
                  onValueChange={(value) =>
                    setEditingGame({ ...editingGame, developerId: +value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите разработчика" />
                  </SelectTrigger>
                  <SelectContent>
                    {developersData.map((dev) => (
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
                  value={editingGame.publisherId.toString()}
                  onValueChange={(value) =>
                    setEditingGame({ ...editingGame, publisherId: +value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите издателя" />
                  </SelectTrigger>
                  <SelectContent>
                    {publishersData.map((pub) => (
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
                value={editingGame.description}
                onChange={(e) =>
                  setEditingGame({
                    ...editingGame,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="crossPlatform"
                  checked={editingGame.crossPlatform}
                  onCheckedChange={(checked) =>
                    setEditingGame({ ...editingGame, crossPlatform: !!checked })
                  }
                />
                <Label htmlFor="crossPlatform">Кроссплатформенность</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="multiplayer"
                  checked={editingGame.multiplayer}
                  onCheckedChange={(checked) =>
                    setEditingGame({ ...editingGame, multiplayer: !!checked })
                  }
                />
                <Label htmlFor="multiplayer">Мультиплеер</Label>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => handleSaveGame(editingGame)}>
                Сохранить
              </Button>
              <Button variant="outline" onClick={() => setEditingGame(null)}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Компонент формы редактирования разработчика
  const DeveloperEditForm = () => {
    if (!editingDeveloper) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              {editingDeveloper.id
                ? "Редактировать разработчика"
                : "Добавить разработчика"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Название</Label>
              <Input
                value={editingDeveloper.name}
                onChange={(e) =>
                  setEditingDeveloper({
                    ...editingDeveloper,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Страна</Label>
              <Input
                value={editingDeveloper.country}
                onChange={(e) =>
                  setEditingDeveloper({
                    ...editingDeveloper,
                    country: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea
                value={editingDeveloper.description}
                onChange={(e) =>
                  setEditingDeveloper({
                    ...editingDeveloper,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => handleSaveDeveloper(editingDeveloper)}>
                Сохранить
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditingDeveloper(null)}
              >
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Компонент формы редактирования издателя
  const PublisherEditForm = () => {
    if (!editingPublisher) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              {editingPublisher.id
                ? "Редактировать издателя"
                : "Добавить издателя"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Название</Label>
              <Input
                value={editingPublisher.name}
                onChange={(e) =>
                  setEditingPublisher({
                    ...editingPublisher,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Местоположение</Label>
              <Input
                value={editingPublisher.location}
                onChange={(e) =>
                  setEditingPublisher({
                    ...editingPublisher,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea
                value={editingPublisher.description}
                onChange={(e) =>
                  setEditingPublisher({
                    ...editingPublisher,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => handleSavePublisher(editingPublisher)}>
                Сохранить
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditingPublisher(null)}
              >
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Управление данными
            </h1>
            <p className="text-gray-600">
              Редактирование игр, разработчиков и издателей
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "games" ? "default" : "outline"}
            onClick={() => setActiveTab("games")}
          >
            Игры ({gamesData.length})
          </Button>
          <Button
            variant={activeTab === "developers" ? "default" : "outline"}
            onClick={() => setActiveTab("developers")}
          >
            Разработчики ({developersData.length})
          </Button>
          <Button
            variant={activeTab === "publishers" ? "default" : "outline"}
            onClick={() => setActiveTab("publishers")}
          >
            Издатели ({publishersData.length})
          </Button>
        </div>

        {activeTab === "games" && (
          <div className="space-y-4">
            <Button
              onClick={() =>
                setEditingGame({
                  id: 0,
                  title: "",
                  description: "",
                  developerId: developersData[0]?.id || 0,
                  publisherId: publishersData[0]?.id || 0,
                  year: new Date().getFullYear(),
                  genre: "",
                  rating: 0,
                  userRating: 0,
                  price: 0,
                  link: "",
                  crossPlatform: false,
                  multiplayer: false,
                })
              }
            >
              Добавить игру
            </Button>

            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
              {gamesData.map((game) => (
                <Card key={game.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{game.title}</h3>
                      <p className="text-sm text-gray-600">
                        {game.genre} • {game.year} • {game.price}₽
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setEditingGame(game)}>
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteGame(game.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "developers" && (
          <div className="space-y-4">
            <Button
              onClick={() =>
                setEditingDeveloper({
                  id: 0,
                  name: "",
                  description: "",
                  country: "",
                })
              }
            >
              Добавить разработчика
            </Button>

            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
              {developersData.map((developer) => (
                <Card key={developer.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{developer.name}</h3>
                      <p className="text-sm text-gray-600">
                        {developer.country}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setEditingDeveloper(developer)}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteDeveloper(developer.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "publishers" && (
          <div className="space-y-4">
            <Button
              onClick={() =>
                setEditingPublisher({
                  id: 0,
                  name: "",
                  description: "",
                  location: "",
                })
              }
            >
              Добавить издателя
            </Button>

            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
              {publishersData.map((publisher) => (
                <Card key={publisher.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{publisher.name}</h3>
                      <p className="text-sm text-gray-600">
                        {publisher.location}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setEditingPublisher(publisher)}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePublisher(publisher.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Модальные окна редактирования */}
        <GameEditForm />
        <DeveloperEditForm />
        <PublisherEditForm />
      </div>
    </div>
  );
};

export default DataManagement;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import {
  games,
  developers,
  publishers,
  Game,
  Developer,
  Publisher,
} from "@/data/gameData";

const DataManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "games" | "developers" | "publishers"
  >("games");
  const [gamesData, setGamesData] = useState(games);
  const [developersData, setDevelopersData] = useState(developers);
  const [publishersData, setPublishersData] = useState(publishers);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(
    null,
  );
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(
    null,
  );

  const handleSaveGame = (game: Game) => {
    const index = gamesData.findIndex((g) => g.id === game.id);
    if (index !== -1) {
      const newGames = [...gamesData];
      newGames[index] = game;
      setGamesData(newGames);
    } else {
      const newGame = {
        ...game,
        id: Math.max(...gamesData.map((g) => g.id)) + 1,
      };
      setGamesData([...gamesData, newGame]);
    }
    setEditingGame(null);
  };

  const handleDeleteGame = (id: number) => {
    setGamesData(gamesData.filter((g) => g.id !== id));
  };

  const handleSaveDeveloper = (developer: Developer) => {
    if (developer.id === 0) {
        const newId = Math.max(...developersData.map((d) => d.id)) + 1; // Используйте developersData вместо developers
        setDevelopersData([...developersData, { ...developer, id: newId }]); // Используйте setDevelopersData
    } else {
        setDevelopersData(
            developersData.map((d) => (d.id === developer.id ? developer : d)) // Используйте developersData вместо developers
        );
    }
    setEditingDeveloper(null);
};

  const handleDeleteDeveloper = (id: number) => {
    setDevelopersData(developersData.filter((d) => d.id !== id));
  };

  const handleSavePublisher = (publisher: Publisher) => {
    if (publisher.id === 0) {
        const newId = Math.max(...publishersData.map((p) => p.id)) + 1; // Используйте publishersData вместо publishers
        setPublishersData([...publishersData, { ...publisher, id: newId }]); // Используйте setPublishersData
    } else {
        setPublishersData(
            publishersData.map((p) => (p.id === publisher.id ? publisher : p)) // Используйте publishersData вместо publishers
        );
    }
    setEditingPublisher(null);
};

  const handleDeletePublisher = (id: number) => {
    setPublishersData(publishersData.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Ввод и редактирование данных
            </h1>
            <p className="text-gray-600">
              Управление играми, разработчиками и издателями
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setActiveTab("games")}
              variant={activeTab === "games" ? "default" : "outline"}
            >
              Игры ({games.length})
            </Button>
            <Button
              onClick={() => setActiveTab("developers")}
              variant={activeTab === "developers" ? "default" : "outline"}
            >
              Разработчики ({developers.length})
            </Button>
            <Button
              onClick={() => setActiveTab("publishers")}
              variant={activeTab === "publishers" ? "default" : "outline"}
            >
              Издатели ({publishers.length})
            </Button>
          </div>

          {activeTab === "games" && (
            <div className="grid gap-4">
              <Button
                onClick={() =>
                  setEditingGame({
                    id: 0,
                    title: "",
                    description: "",
                    developerId: 1,
                    publisherId: 1,
                    year: 2024,
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
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить игру
              </Button>

              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {games.map((game) => (
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

          {activeTab === "developers" && (
            <div className="grid gap-4">
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
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить разработчика
              </Button>

              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {developers.map((developer) => (
                  <Card key={developer.id} className="p-4">
                    <div className="flex justify-between items-center">
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
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить издателя
              </Button>

              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {publishers.map((publisher) => (
                  <Card key={publisher.id} className="p-4">
                    <div className="flex justify-between items-center">
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

        {editingGame && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Редактирование игры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Название</Label>
                    <Input
                      value={editingGame.title}
                      onChange={(e) =>
                        setEditingGame({
                          ...editingGame,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Жанр</Label>
                    <Input
                      value={editingGame.genre}
                      onChange={(e) =>
                        setEditingGame({
                          ...editingGame,
                          genre: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Год</Label>
                    <Input
                      type="number"
                      value={editingGame.year}
                      onChange={(e) =>
                        setEditingGame({
                          ...editingGame,
                          year: +e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Цена (₽)</Label>
                    <Input
                      type="number"
                      value={editingGame.price}
                      onChange={(e) =>
                        setEditingGame({
                          ...editingGame,
                          price: +e.target.value,
                        })
                      }
                    />
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
                      checked={editingGame.crossPlatform}
                      onCheckedChange={(checked) =>
                        setEditingGame({
                          ...editingGame,
                          crossPlatform: !!checked,
                        })
                      }
                    />
                    <Label>Кроссплатформенность</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={editingGame.multiplayer}
                      onCheckedChange={(checked) =>
                        setEditingGame({
                          ...editingGame,
                          multiplayer: !!checked,
                        })
                      }
                    />
                    <Label>Мультиплеер</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleSaveGame(editingGame)}>
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingGame(null)}
                  >
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {editingDeveloper && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Редактирование разработчика</CardTitle>
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
                <div className="flex gap-2">
                  <Button onClick={() => handleSaveDeveloper(editingDeveloper)}>
                    <Icon name="Save" size={16} className="mr-2" />
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
        )}

        {editingPublisher && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Редактирование издателя</CardTitle>
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
                <div className="flex gap-2">
                  <Button onClick={() => handleSavePublisher(editingPublisher)}>
                    <Icon name="Save" size={16} className="mr-2" />
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
        )}
      </div>
    </div>
  );
};

export default DataManagement;

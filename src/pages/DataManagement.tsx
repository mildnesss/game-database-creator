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
} from "@/components/ui/select"; // Добавлен импорт Select компонентов
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
  // ... (предыдущий код остается без изменений до render)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ... (остальная разметка без изменений) ... */}
    </div>
  );
};

// Компонент GameEditModal с исправленными импортами
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
          {/* ... (остальная разметка модального окна) ... */}
        </CardContent>
      </Card>
    </div>
  );
};

// Добавляем недостающие компоненты модальных окон
const DeveloperEditModal = ({ developer, onSave, onCancel }: {
  developer: Developer;
  onSave: (developer: Developer) => void;
  onCancel: () => void;
}) => {
  const [editedDeveloper, setEditedDeveloper] = useState<Developer>(developer);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            {developer.id === 0 ? "Добавление разработчика" : "Редактирование разработчика"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Название</Label>
            <Input
              value={editedDeveloper.name}
              onChange={(e) =>
                setEditedDeveloper({ ...editedDeveloper, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Страна</Label>
            <Input
              value={editedDeveloper.country}
              onChange={(e) =>
                setEditedDeveloper({ ...editedDeveloper, country: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea
              value={editedDeveloper.description}
              onChange={(e) =>
                setEditedDeveloper({ ...editedDeveloper, description: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onSave(editedDeveloper)}>
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

const PublisherEditModal = ({ publisher, onSave, onCancel }: {
  publisher: Publisher;
  onSave: (publisher: Publisher) => void;
  onCancel: () => void;
}) => {
  const [editedPublisher, setEditedPublisher] = useState<Publisher>(publisher);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            {publisher.id === 0 ? "Добавление издателя" : "Редактирование издателя"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Название</Label>
            <Input
              value={editedPublisher.name}
              onChange={(e) =>
                setEditedPublisher({ ...editedPublisher, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Местоположение</Label>
            <Input
              value={editedPublisher.location}
              onChange={(e) =>
                setEditedPublisher({ ...editedPublisher, location: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea
              value={editedPublisher.description}
              onChange={(e) =>
                setEditedPublisher({ ...editedPublisher, description: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onSave(editedPublisher)}>
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

export default DataManagement;

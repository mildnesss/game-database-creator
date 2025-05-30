import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const DatabaseInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Сведения о базе данных
            </h1>
            <p className="text-gray-600">
              Информация о разработчике и назначении системы
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="User" size={24} className="text-blue-600" />О
                разработчике
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800">Разработчик:</h4>
                  <p className="text-gray-600">Гутарева Мария</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Учебное заведение:
                  </h4>
                  <p className="text-gray-600">ИАТЭ НИЯУ МИФИ</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Группа:</h4>
                  <p className="text-gray-600">[Курс и группа]</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Target" size={24} className="text-green-600" />
                Цели системы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  Управление каталогом компьютерных игр
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  Поиск и фильтрация по различным критериям
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  Анализ статистики игровой индустрии
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="CheckCircle"
                    size={16}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  Учет разработчиков и издателей
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Database" size={24} className="text-purple-600" />
                Функции базы данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Основные возможности:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Добавление и редактирование информации об играх</li>
                    <li>• Управление данными разработчиков и издателей</li>
                    <li>• Поиск по ценовому диапазону</li>
                    <li>• Каскадный поиск по жанру и году</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Аналитические функции:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Статистика по количеству игр</li>
                    <li>• Анализ распределения разработчиков</li>
                    <li>• Статистика по странам</li>
                    <li>• Динамические отчеты</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DatabaseInfo;

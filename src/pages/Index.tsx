import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Ввод и редактирование данных",
      description:
        "Добавление новых игр, редактирование существующих записей и управление разработчиками",
      icon: "Edit3",
      path: "/data-management",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Поиск по стоимости",
      description:
        "Поиск игр в заданном диапазоне цен с фильтрацией по стоимости",
      icon: "DollarSign",
      path: "/price-search",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "Поиск по жанру и году",
      description:
        "Синхронный поиск игр по жанру и году выпуска с каскадной фильтрацией",
      icon: "Search",
      path: "/genre-year-search",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Статистика",
      description:
        "Динамическая аналитика: количество игр, разработчиков, статистика по странам",
      icon: "BarChart3",
      path: "/statistics",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      title: "Сведения о БД",
      description: "Информация о разработчике, целях и функциях базы данных",
      icon: "Info",
      path: "/database-info",
      color: "bg-gradient-to-br from-gray-500 to-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Icon name="Database" size={40} className="text-purple-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              База данных
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Компьютерные игры
          </p>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-0 overflow-hidden"
              onClick={() => navigate(item.path)}
            >
              <div className={`h-2 ${item.color}`} />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-3 rounded-lg ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon name={item.icon} size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {item.description}
                </CardDescription>
                <Button
                  variant="ghost"
                  className="w-full mt-4 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors"
                >
                  Открыть
                  <Icon
                    name="ArrowRight"
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Stats Preview */}
        <div className="text-center my-80">
          <div className="inline-flex items-center gap-8 bg-white rounded-xl shadow-lg py-0 px-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600"></div>
              <div className="text-sm text-gray-500"></div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600"></div>
              <div className="text-sm text-gray-500"></div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600"></div>
              <div className="text-sm text-gray-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const DataManagement = () => {
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
              Ввод и редактирование данных
            </h1>
            <p className="text-gray-600">
              Управление играми, разработчиками и издателями
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Edit3" size={24} className="text-blue-600" />
              Форма редактирования
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icon
                name="Construction"
                size={64}
                className="text-gray-400 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                В разработке
              </h3>
              <p className="text-gray-500">
                Форма ввода и редактирования данных будет готова в следующем
                обновлении
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataManagement;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import CascadeSearch from "@/components/CascadeSearch";
import { games } from "@/data/gameData";

const GenreYearSearch = () => {
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
              Поиск по жанру и году
            </h1>
            <p className="text-gray-600">
              Синхронный поиск с каскадной фильтрацией
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <CascadeSearch games={games} />
        </div>
      </div>
    </div>
  );
};

export default GenreYearSearch;

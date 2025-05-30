import React, { useState } from "react";

type Game = {
  id: number;
  title: string;
  genre: string;
  year: number;
  price: number;
};

const initialGames: Game[] = [
  { id: 1, title: "Game 1", genre: "Action", year: 2020, price: 1000 },
  { id: 2, title: "Game 2", genre: "RPG", year: 2021, price: 1500 },
];

const DataManagement = () => {
  const [gamesData, setGamesData] = useState<Game[]>(initialGames);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const handleSaveGame = (game: Game) => {
    if (game.id === 0) {
      const newId = gamesData.length > 0 ? Math.max(...gamesData.map((g) => g.id)) + 1 : 1;
      setGamesData([...gamesData, { ...game, id: newId }]);
    } else {
      setGamesData(gamesData.map((g) => (g.id === game.id ? game : g)));
    }
    setEditingGame(null);
  };

  const handleDeleteGame = (id: number) => {
    setGamesData(gamesData.filter((g) => g.id !== id));
  };

  return (
    <div>
      <button onClick={() => setEditingGame({ id: 0, title: "", genre: "", year: 2025, price: 0 })}>
        Добавить игру
      </button>
      <ul>
        {gamesData.map((game) => (
          <li key={game.id}>
            {game.title} ({game.genre}, {game.year}) - {game.price}₽
            <button onClick={() => setEditingGame(game)}>Редактировать</button>
            <button onClick={() => handleDeleteGame(game.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      {editingGame && (
        <div style={{ border: "1px solid black", padding: "10px", marginTop: "20px" }}>
          <input
            type="text"
            value={editingGame.title}
            onChange={(e) => setEditingGame({ ...editingGame, title: e.target.value })}
            placeholder="Название"
          />
          <input
            type="text"
            value={editingGame.genre}
            onChange={(e) => setEditingGame({ ...editingGame, genre: e.target.value })}
            placeholder="Жанр"
          />
          <input
            type="number"
            value={editingGame.year}
            onChange={(e) => setEditingGame({ ...editingGame, year: Number(e.target.value) })}
            placeholder="Год"
          />
          <input
            type="number"
            value={editingGame.price}
            onChange={(e) => setEditingGame({ ...editingGame, price: Number(e.target.value) })}
            placeholder="Цена"
          />
          <button onClick={() => handleSaveGame(editingGame)}>Сохранить</button>
          <button onClick={() => setEditingGame(null)}>Отмена</button>
        </div>
      )}

      <pre>{JSON.stringify(gamesData, null, 2)}</pre>
    </div>
  );
};

export default DataManagement;

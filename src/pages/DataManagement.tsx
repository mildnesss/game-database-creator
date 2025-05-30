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

export default function DataManagement() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const handleSaveGame = (game: Game) => {
    if (game.id === 0) {
      const newId = games.length > 0 ? Math.max(...games.map((g) => g.id)) + 1 : 1;
      setGames([...games, { ...game, id: newId }]);
    } else {
      setGames(games.map((g) => (g.id === game.id ? game : g)));
    }
    setEditingGame(null);
  };

  const handleDeleteGame = (id: number) => {
    setGames(games.filter((g) => g.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setEditingGame({ id: 0, title: "", genre: "", year: 2025, price: 0 })}>
        Добавить игру
      </button>

      <ul>
        {games.map((game) => (
          <li key={game.id} style={{ marginBottom: 10 }}>
            <b>{game.title}</b> ({game.genre}, {game.year}) - {game.price}₽
            <button onClick={() => setEditingGame(game)} style={{ marginLeft: 10 }}>
              Редактировать
            </button>
            <button onClick={() => handleDeleteGame(game.id)} style={{ marginLeft: 5 }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>

      {editingGame && (
        <div style={{ border: "1px solid #ccc", padding: 10, maxWidth: 300 }}>
          <input
            type="text"
            placeholder="Название"
            value={editingGame.title}
            onChange={(e) => setEditingGame({ ...editingGame, title: e.target.value })}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            type="text"
            placeholder="Жанр"
            value={editingGame.genre}
            onChange={(e) => setEditingGame({ ...editingGame, genre: e.target.value })}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            type="number"
            placeholder="Год"
            value={editingGame.year}
            onChange={(e) => setEditingGame({ ...editingGame, year: Number(e.target.value) })}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            type="number"
            placeholder="Цена"
            value={editingGame.price}
            onChange={(e) => setEditingGame({ ...editingGame, price: Number(e.target.value) })}
            style={{ width: "100%", marginBottom: 8 }}
          />

          <button onClick={() => handleSaveGame(editingGame)} style={{ marginRight: 10 }}>
            Сохранить
          </button>
          <button onClick={() => setEditingGame(null)}>Отмена</button>
        </div>
      )}
    </div>
  );
}

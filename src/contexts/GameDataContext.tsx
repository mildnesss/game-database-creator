import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  games as initialGames,
  developers as initialDevelopers,
  publishers as initialPublishers,
  Game,
  Developer,
  Publisher,
} from "@/data/gameData";

interface GameDataContextType {
  games: Game[];
  developers: Developer[];
  publishers: Publisher[];
  addGame: (game: Omit<Game, "id">) => void;
  updateGame: (game: Game) => void;
  deleteGame: (id: number) => void;
  addDeveloper: (developer: Omit<Developer, "id">) => void;
  updateDeveloper: (developer: Developer) => void;
  deleteDeveloper: (id: number) => void;
  addPublisher: (publisher: Omit<Publisher, "id">) => void;
  updatePublisher: (publisher: Publisher) => void;
  deletePublisher: (id: number) => void;
}

const GameDataContext = createContext<GameDataContextType | undefined>(
  undefined,
);

export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (!context) {
    throw new Error("useGameData must be used within GameDataProvider");
  }
  return context;
};

export const GameDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [developers, setDevelopers] = useState<Developer[]>(initialDevelopers);
  const [publishers, setPublishers] = useState<Publisher[]>(initialPublishers);

  const addGame = (gameData: Omit<Game, "id">) => {
    const newId = Math.max(0, ...games.map((g) => g.id)) + 1;
    setGames([...games, { ...gameData, id: newId }]);
  };

  const updateGame = (game: Game) => {
    setGames(games.map((g) => (g.id === game.id ? game : g)));
  };

  const deleteGame = (id: number) => {
    setGames(games.filter((g) => g.id !== id));
  };

  const addDeveloper = (developerData: Omit<Developer, "id">) => {
    const newId = Math.max(0, ...developers.map((d) => d.id)) + 1;
    setDevelopers([...developers, { ...developerData, id: newId }]);
  };

  const updateDeveloper = (developer: Developer) => {
    setDevelopers(
      developers.map((d) => (d.id === developer.id ? developer : d)),
    );
  };

  const deleteDeveloper = (id: number) => {
    setDevelopers(developers.filter((d) => d.id !== id));
  };

  const addPublisher = (publisherData: Omit<Publisher, "id">) => {
    const newId = Math.max(0, ...publishers.map((p) => p.id)) + 1;
    setPublishers([...publishers, { ...publisherData, id: newId }]);
  };

  const updatePublisher = (publisher: Publisher) => {
    setPublishers(
      publishers.map((p) => (p.id === publisher.id ? publisher : p)),
    );
  };

  const deletePublisher = (id: number) => {
    setPublishers(publishers.filter((p) => p.id !== id));
  };

  return (
    <GameDataContext.Provider
      value={{
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
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};

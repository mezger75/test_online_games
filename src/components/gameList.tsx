import GameListItem from './gameListItem';
import { Game } from '../types/gameTypes';

interface GameListProps {
  games: Game[];
  visibleGames: number;
}

const GameList: React.FC<GameListProps> = ({ games, visibleGames }) => {
  return (
    <ul className='grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
      {games.slice(0, visibleGames).map((game) => (
        <GameListItem key={game.gameKey} game={game} />
      ))}
    </ul>
  );
};

export default GameList;

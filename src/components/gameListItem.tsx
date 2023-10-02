import Link from 'next/link';
import Image from 'next/image';

import { Game } from '@/types/gameTypes';

interface GameListItemProps {
  game: Game;
}

const GameListItem: React.FC<GameListItemProps> = ({ game }) => {
  return (
    <li
      key={game.gameKey}
      className='flex flex-col items-center shadow-md rounded gap-y-2 overflow-hidden'
    >
      <div className='relative overflow-hidden flex justify-center items-center'>
        <Link href={`/${game.title}`}>
          <Image
            src={`https://cdn2.softswiss.net/i/s2/${game.gameKey}.png`}
            width={300}
            height={200}
            alt={game.title}
            priority
            className='transition-transform transform hover:scale-110'
          />
        </Link>
      </div>
      <p className='p-1 text-center'>{game.title}</p>
    </li>
  );
};

export default GameListItem;

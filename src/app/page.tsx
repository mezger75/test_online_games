'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { RootState } from '../store/store';
import { fetchGames, loadMoreGames } from '../store/gamesSlice';
import GameList from '../components/gameList';
import Filters from '../components/gameFilters';

const Home: React.FC = () => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();

  const {
    games,
    isLoading,
    visibleGames,
    selectedProvider,
    selectedCurrency,
    uniqueProviders,
    uniqueCurrency,
  } = useSelector((state: RootState) => state.games);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch, selectedProvider, selectedCurrency]);

  return (
    <main className=''>
      <div className='max-w-[1440px] mx-auto flex flex-col p-2'>
        <Filters
          selectedProvider={selectedProvider}
          selectedCurrency={selectedCurrency}
          uniqueProviders={uniqueProviders}
          uniqueCurrency={uniqueCurrency}
        />
        {isLoading || games.length === 0 ? (
          <p className='text-lg font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 uppercase'>
            Loading...
          </p>
        ) : (
          <>
            <GameList games={games} visibleGames={visibleGames} />
            {visibleGames < games.length && (
              <div className='flex justify-center'>
                <button
                  className='px-12 py-3 border rounded my-5 hover:bg-slate-100 active:translate-y-[3px] transition-transform uppercase text-sm shadow-md font-semibold'
                  onClick={() => dispatch(loadMoreGames())}
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Home;

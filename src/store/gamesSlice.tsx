import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

import { Game } from '@/types/gameTypes';

interface GamesState {
  games: Game[];
  isLoading: boolean;
  visibleGames: number;
  selectedProvider: string;
  selectedCurrency: string;
  uniqueProviders: string[];
  uniqueCurrency: string[];
}

const initialState: GamesState = {
  games: [],
  isLoading: false,
  visibleGames: 12,
  selectedProvider: '',
  selectedCurrency: '',
  uniqueProviders: [],
  uniqueCurrency: [],
};

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (_, { getState }) => {
    const state = getState() as RootState;

    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/mezger75/test_online_games/main/server/games.json'
      );
      const gamesData: Game[] = await response.json();

      const gamesArray = Object.entries(gamesData)
        .map(([gameKey, value]) => ({
          gameKey,
          ...(value as Game),
        }))
        .filter(
          (game) =>
            (state.games.selectedProvider
              ? game.provider === state.games.selectedProvider
              : true) &&
            (state.games.selectedCurrency
              ? Object.keys(game.real).includes(state.games.selectedCurrency)
              : true)
        );

      gamesArray.sort(
        (a, b) => b.collections.popularity - a.collections.popularity
      );

      return gamesArray;
    } catch (error) {
      throw new Error('Failed to fetch games');
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSelectedProvider: (state, action) => {
      state.selectedProvider = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    loadMoreGames: (state) => {
      state.visibleGames += 12;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload;
        state.uniqueProviders = Array.from(
          new Set(action.payload.map((game) => game.provider))
        ).sort();
        const allCurrency = action.payload.flatMap((game) =>
          Object.keys(game.real)
        );
        state.uniqueCurrency = Array.from(new Set(allCurrency)).sort();
      })
      .addCase(fetchGames.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSelectedProvider, setSelectedCurrency, loadMoreGames } =
  gamesSlice.actions;

export default gamesSlice.reducer;

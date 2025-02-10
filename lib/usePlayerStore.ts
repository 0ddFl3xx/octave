import { create } from "zustand";

interface Track {
  id: string;
  name: string;
  artist: string;
  duration: number;
  imageUrl: string;
  audioUrl: string;
  albumName: string;
}

interface PlayerStore {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  queue: Track[];
  playHistory: Track[];
  isShuffled: boolean;
  originalQueue: Track[];
  isLooping: boolean;
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  addToQueue: (track: Track) => void;
  setQueue: (tracks: Track[]) => void;
  removeFromQueue: (trackId: string) => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 1,
  queue: [],
  playHistory: [],
  isShuffled: false,
  originalQueue: [],
  isLooping: false,

  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => set({ volume }),

  setQueue: (tracks) =>
    set({
      queue: tracks,
      originalQueue: tracks, // Initialize original queue
      isShuffled: false, // Reset shuffle state when setting a new queue
    }),

  addToQueue: (track) =>
    set((state) => ({
      queue: [...state.queue, track],
      originalQueue: [...state.originalQueue, track],
    })),

  removeFromQueue: (trackId) =>
    set((state) => ({
      queue: state.queue.filter((track) => track.id !== trackId),
      originalQueue: state.originalQueue.filter(
        (track) => track.id !== trackId
      ),
    })),

  skipToNext: () =>
    set((state) => {
      // If looping is enabled, just keep playing the current track
      if (state.isLooping && state.currentTrack) {
        return {
          isPlaying: true,
        };
      }

      if (state.queue.length === 0) {
        return state; // Nothing to play
      }

      const newHistory = state.currentTrack
        ? [...state.playHistory, state.currentTrack]
        : state.playHistory;

      // Logic for looping
      if (state.isLooping) {
        return {
          ...state, // Keep the current track
          isPlaying: true,
        };
      }

      let nextTrackIndex = 0; // Default to the first track

      if (state.isShuffled) {
        // Shuffle logic:
        const availableIndices = state.queue
          .map((_, i) => i)
          .filter((i) => state.queue[i] !== state.currentTrack); // Exclude current track

        if (availableIndices.length > 0) {
          nextTrackIndex =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];
        } else {
          // All tracks (except current) have been played in shuffle mode.
          if (state.queue.length > 1) {
            console.warn(
              "All tracks played in shuffle mode. Resetting shuffle."
            );
            const availableIndicesReset = state.queue
              .map((_, i) => i)
              .filter((i) => state.queue[i] !== state.currentTrack);
            nextTrackIndex =
              availableIndicesReset[
                Math.floor(Math.random() * availableIndicesReset.length)
              ];
          } else {
            console.warn("Only one track in queue. Cannot proceed.");
            return state; // No other tracks to play
          }
        }
      }

      const nextTrack = state.queue[nextTrackIndex];
      const newQueue = state.queue.slice(nextTrackIndex + 1); // Remove the next track

      return {
        currentTrack: nextTrack,
        queue: newQueue,
        playHistory: newHistory,
        isPlaying: true,
      };
    }),

  skipToPrevious: () =>
    set((state) => {
      // If looping is enabled, just keep playing the current track
      if (state.isLooping && state.currentTrack) {
        return {
          isPlaying: true,
        };
      }

      if (state.playHistory.length === 0) {
        return state;
      }

      const previousTrack = state.playHistory[state.playHistory.length - 1];
      const newQueue = state.currentTrack
        ? [state.currentTrack, ...state.queue]
        : state.queue;

      return {
        currentTrack: previousTrack,
        queue: newQueue,
        playHistory: state.playHistory.slice(0, -1),
        isPlaying: true,
      };
    }),

  toggleShuffle: () =>
    set((state) => {
      const newIsShuffled = !state.isShuffled;
      let newQueue = [...state.queue]; // Create a copy

      if (newIsShuffled) {
        newQueue = shuffleArray(newQueue);
      } else {
        newQueue = [...state.originalQueue]; // Restore original order
      }

      return {
        isShuffled: newIsShuffled,
        queue: newQueue,
      };
    }),
    
  toggleLoop: () =>
    set((state) => ({
      isLooping: !state.isLooping,
    })),
}));

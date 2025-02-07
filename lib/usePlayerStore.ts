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
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  addToQueue: (track: Track) => void;
  setQueue: (tracks: Track[]) => void;
  removeFromQueue: (trackId: string) => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 1,
  queue: [],
  playHistory: [],
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => set({ volume }),
  setQueue: (tracks) => set({ queue: tracks }),
  addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
  clearQueue: () => set({ queue: [] }),

  removeFromQueue: (trackId) =>
    set((state) => ({
      queue: state.queue.filter((track) => track.id !== trackId),
    })),

  skipToNext: () =>
    set((state) => {
      // If there's nothing in the queue, keep the current track
      if (state.queue.length === 0) {
        return state;
      }

      // Add current track to history if it exists
      const newHistory = state.currentTrack
        ? [...state.playHistory, state.currentTrack]
        : state.playHistory;

      return {
        currentTrack: state.queue[0],
        queue: state.queue.slice(1),
        playHistory: newHistory,
        isPlaying: true, // Auto-play next track
      };
    }),
    
  skipToPrevious: () =>
    set((state) => {
      // If there's no history, keep the current track
      if (state.playHistory.length === 0) {
        return state;
      }

      const previousTrack = state.playHistory[state.playHistory.length - 1];

      // Add current track to beginning of queue if it exists
      const newQueue = state.currentTrack
        ? [state.currentTrack, ...state.queue]
        : state.queue;

      return {
        currentTrack: previousTrack,
        queue: newQueue,
        playHistory: state.playHistory.slice(0, -1),
        isPlaying: true, // Auto-play previous track
      };
    }),
}));

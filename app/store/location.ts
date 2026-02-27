import { locations } from "@constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Locations = typeof locations;
type LocationKey = keyof Locations;
type Location = Locations[LocationKey];

type LocationState = {
  activeLocation: Location;
  setActiveLocation: (location: Location) => void;
  resetActiveLocation: () => void;
};

const DEFAULT_LOCATION: Location = locations.work;

const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location: Location) => {
      if (location === undefined) return;
      set({ activeLocation: location });
    },

    resetActiveLocation: () => set({ activeLocation: DEFAULT_LOCATION }),
  })),
);

export default useLocationStore;
export type { Location, LocationKey, Locations, LocationState };

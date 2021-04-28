import { createSlice } from "@reduxjs/toolkit";

const episodesSlice = createSlice({
  name: "episodes",
  initialState: {
    signedIn: false,
    episodes: [],
    allCharacters: [],
    locations: [],
    charactersForEpisode: [],
    selectedEpisodeId: '',
    selectedCharacterId: null,
    originResidents: [],
    locationResidents: []
  },
  reducers: {
    handleStateLogin(state, action) {
      state.signedIn = action.payload.status;
    },
    saveEpisodes(state, action) {
      state.episodes = action.payload.episodes;
    },
    saveAllCharacters(state, action) {
      state.allCharacters = action.payload.allCharacters;
    },
    saveLocations(state, action){
      state.locations = action.payload.locations
    },
    saveCharacters(state, action) {
      state.charactersForEpisode = action.payload.charactersForEpisode;
    },
    selectEpisodeId(state, action){
      state.selectedEpisodeId = action.payload.selectedEpisodeId;
    },
    selectCharacterId(state, action){
      state.selectedCharacterId = action.payload.selectedCharacterId;
    },
    saveOriginResidents(state, action){
      state.originResidents = action.payload.originResidents;
    },
    saveLocationResidents(state, action){
      state.locationResidents = action.payload.locationResidents;
    }
  },
});

export const episodesActions = episodesSlice.actions;

export default episodesSlice;

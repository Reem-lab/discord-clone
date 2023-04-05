import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    channelId: null,
    channelName: null,

    channelPrivacy: false,
  },

  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
      state.channelPrivacy = action.payload.channelPrivacy;
    },
  },

});

export const { setChannelInfo } = appSlice.actions;

export const selectChannelID = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectChannelPrivacy = (state) => state.app.channelPrivacy;

export default appSlice.reducer;

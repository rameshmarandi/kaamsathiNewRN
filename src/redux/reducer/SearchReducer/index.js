import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   selectedRadius :"5",
   jobDuration:"4",
   bookingDate:""
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelectedRadius(state, action) {
      state.selectedRadius = action.payload;
    },
    setJobDuration(state, action) {
      state.jobDuration = action.payload;
    },
    setBookingDate(state, action) {
      state.bookingDate = action.payload;
    },
  },
});

export const {setSelectedRadius , setJobDuration , setBookingDate} = searchSlice.actions;
export default searchSlice.reducer;

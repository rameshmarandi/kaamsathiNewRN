import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedRadius: {
    key: 'radius',
    label: 'Radius',
    icon: 'map-marker-radius',
    placeholder: '5',
  },
  jobDuration: {id: 2, label: '3 hours', value: 3},
  bookingDate: '',
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

export const {setSelectedRadius, setJobDuration, setBookingDate} =
  searchSlice.actions;
export default searchSlice.reducer;

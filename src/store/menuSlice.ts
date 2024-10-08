import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '../types';

interface MenuState {
  items: MenuItem[];
}

const initialState: MenuState = {
  items: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
  },
});

export const { setMenuItems, addMenuItem } = menuSlice.actions;
export default menuSlice.reducer;

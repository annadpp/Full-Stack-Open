import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    addVoteAnecdote(state, action) {
      const id = action.payload.id;
      const changedAnecdote = action.payload;

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { addVoteAnecdote, appendAnecdote, setAnecdote } =
  anecdoteSlice.actions;

export const addVotes = (id) => {
  return async (dispatch) => {
    const newVote = await anecdoteService.updateVote(id);
    dispatch(addVoteAnecdote(newVote));
  };
};

export const initializeAncedotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdote(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;

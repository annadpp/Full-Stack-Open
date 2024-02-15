import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

import anecdotes from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdoteInput.value;
    e.target.anecdoteInput.value = "";
    const newAnecdote = await anecdotes.createNewAnecdote(content);
    dispatch(createAnecdote(newAnecdote.content));
    dispatch(showNotification(`you added "${content}"`));
    setTimeout(() => {
      dispatch(showNotification(""));
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdoteInput" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

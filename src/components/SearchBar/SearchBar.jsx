import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Ви нічого не ввели для пошуку');

const SearchBar = ({ onSearch }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.query.value;
    console.log(query.trim() === '');
    if (query.trim() === '') {
      notify();
      form.reset()
    }
    onSearch(query.trim());
  };

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;

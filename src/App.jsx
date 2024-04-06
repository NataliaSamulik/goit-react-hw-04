import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchImagesWithKeyword } from './images-api';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(null);
  const [select, setSelect] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const notify = () => toast('За вашим запитом нічого не знайдено');
  const notify1 = () => toast('Ви нічого не ввели для пошуку');

  useEffect(() => {
    async function fatchImages() {
      if (total === 1) {
        try {
          setLoading(true);
          setImages([]);
          setError(false);
          if (search.trim() === '') {
            notify1();
            return;
          }
          const data = await fetchImagesWithKeyword(search, total);
          console.log(search == '');
          if (data.results.length === 0) {
            notify();
            return;
          }
          setImages(data.results);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
        return;
      }
      try {
        setLoading(true);
        const data = await fetchImagesWithKeyword(search, total);
        setImages(prevImages => [...prevImages, ...data.results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fatchImages();
  }, [search, total]);

  const handleSearchSubmit = query => {
    setSearch(query);
    setTotal(1);
  };

  const handleMoreClick = () => {
    setTotal(total => total + 1);
  };

  const onSelectChange = url => {
    setSelect(url);
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setSelect(null);
    setModalOpen(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearchSubmit} />
      <Toaster />
      {images.length > 0 && (
        <ImageGallery imgList={images} onClick={onSelectChange} />
      )}

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && <LoadMoreBtn onClick={handleMoreClick} />}
      <ImageModal isOpen={modalOpen} url={select} onClose={onCloseModal} />
    </>
  );
}

export default App;

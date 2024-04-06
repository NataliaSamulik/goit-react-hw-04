import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ imgList, onClick }) => {
  return (
    <ul className={css.galleryList}>
      {imgList.map(imgItem => (
        <li key={imgItem.id} className={css.galleryItem}>
          <ImageCard image={imgItem} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;

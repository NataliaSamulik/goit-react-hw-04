import css from './ImageCard.module.css'

const ImageCard = ({ image, onClick }) => {
  const selectImage =()=>{
    onClick(image.urls.regular)
  }
  return (
    <div className={css.card}>
      <img className={css.image} src={image.urls.small} alt={image.alt_description} onClick={selectImage}/>
     </div>
  );
};

export default ImageCard;

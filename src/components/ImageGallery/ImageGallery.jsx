import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ hits }) => {
  console.log('hits in ImageGallery  :>> ', hits);
  return (
    <div>
      <ul>
        {hits.map(hit => (
          <ImageGalleryItem hit={hit} key={hit.id} />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;

import { Component } from 'react';
import {
  ImageGalleryItemImg,
  ImageGalleryItemStyled,
} from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  state = {
    largeImageURL: this.props.largeImageURL,
    tags: this.props.tags,
  };
  hendleImgClick = () => {
    this.props.onClick(this.state);
  };
  render() {
    const { webformatURL, tags } = this.props;

    return (
      <ImageGalleryItemStyled onClick={this.hendleImgClick}>
        <ImageGalleryItemImg src={webformatURL} alt={tags} />
      </ImageGalleryItemStyled>
    );
  }
}

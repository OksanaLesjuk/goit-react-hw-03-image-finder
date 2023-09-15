import { Component } from 'react';
import { ModalStyled, Overlay } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }
  handleEsc = e => {
    if (e.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };
  render() {
    const { largeImageURL, tags, handleCloseModal } = this.props;
    return (
      <Overlay onClick={handleCloseModal}>
        <ModalStyled>
          <img src={largeImageURL} alt={tags} />
        </ModalStyled>
      </Overlay>
    );
  }
}

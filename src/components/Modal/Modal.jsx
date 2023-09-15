import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled, Overlay } from './Modal.styled';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const modalWindow = document.querySelector('#root-modal');
export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
    disablePageScroll();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
    enablePageScroll();
  }
  handleEsc = e => {
    if (e.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.handleCloseModal();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <img src={largeImageURL} alt={tags} />
        </ModalStyled>
      </Overlay>,
      modalWindow
    );
  }
}

import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getPhotosService } from 'api/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import StyledApp from 'App.styled';
import Button from './Button/Button';

export default class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    currentPage: 1,
    quantityPage: null,
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: null,
    tags: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.currentPage !== prevState.currentPage ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.fetchGallery();
    }
  }

  fetchGallery = async () => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await getPhotosService(
        this.state.searchQuery,
        this.state.currentPage
      );

      if (!hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      if (hits.length > 0) {
        this.setState(prev => ({
          gallery: [...prev.gallery, ...hits],
          quantityPage: Math.ceil(totalHits / 12),
        }));
      }
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      currentPage: 1,
      quantityPage: null,
      gallery: [],
      error: null,
      searchQuery,
    });
  };

  handleModal = obj => {
    this.setState({ isLoading: true, showModal: true, ...obj });
  };

  handleCloseModal = () => {
    this.setState({ isLoading: false, showModal: false });
  };

  handleBtnLoad = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };

  render() {
    const {
      error,
      gallery,
      isLoading,
      showModal,
      largeImageURL,
      tags,
      currentPage,
      quantityPage,
    } = this.state;

    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {error && Notify.failure(error)}
        {gallery && gallery.length > 0 && (
          <ImageGallery hits={gallery} onClick={this.handleModal} />
        )}
        {currentPage < quantityPage && (
          <Button handleBtnLoad={this.handleBtnLoad} />
        )}

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </StyledApp>
    );
  }
}

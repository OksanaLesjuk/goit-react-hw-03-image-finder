import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getPhotosService } from 'api/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    searchQuery: '',
    gallery: null,
    currentPage: 1,
    error: null,
    isLoading: false,
  };

  componentDidMount;

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.currentPage !== prevState.currentPage ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.fetchGallery();
    }
  }

  fetchGallery = async () => {
    this.setState({ error: null, isLoading: true });
    try {
      const { hits } = await getPhotosService(
        this.state.searchQuery,
        this.state.currentPage
      );
      this.setState({ gallery: hits, error: null });

      // if (hits.length === 0) {
      //   this.setState({ error: 'Not data found', gallery: null });
      // }
      // if (hits.length > 0) {
      //   this.setState({ gallery: hits, error: null });
      // }
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  hendleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { error, gallery, isLoading } = this.state;

    console.log('error :>> ', error);

    console.log('gallery :>> ', gallery);
    return (
      <>
        <Searchbar onSubmit={this.hendleFormSubmit} />
        {isLoading && <Loader />}
        {error && Notify.failure(error)}
        {gallery &&
          (gallery.length > 0 ? (
            <ImageGallery hits={gallery} />
          ) : (
            Notify.failure('Not data found')
          ))}
      </>
    );
  }
}

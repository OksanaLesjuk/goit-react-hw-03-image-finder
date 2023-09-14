import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getPhotosService } from 'api/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Loader from './Loader/Loader';

//ВАРІАНТ 1 Стейт-машина  ПИТАННЯ Як зарендирити форму ?

// export default class App extends Component {
//   state = {
//     searchQuery: '',
//     gallery: null,
//     currentPage: 1,
//     error: null,

//     status: 'idle',
//   };

//   componentDidMount;

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       this.state.currentPage !== prevState.currentPage ||
//       this.state.searchQuery !== prevState.searchQuery
//     ) {
//       this.fetchGallery();
//     }
//   }

//   fetchGallery = async () => {
//     this.setState({ status: 'panding' });
//     try {
//       const { hits } = await getPhotosService(
//         this.state.searchQuery,
//         this.state.currentPage
//       );
//       this.setState({ gallery: hits, status: 'resolved' });

//       if (hits.length === 0) {
//         this.setState({ error: 'Not data found' });
//       }
//       if (hits.length > 0) {
//         this.setState({ gallery: hits });
//       }
//     } catch (err) {
//       this.setState({ error: err.message, status: 'rejected' });
//     }
//   };

//   hendleFormSubmit = searchQuery => {
//     this.setState({ error: null, searchQuery });
//   };

//   render() {
//     const { error, gallery, status } = this.state;

//     if (status === 'panding') {
//       return <Loader />;
//     }

//     if (status === 'rejected') {
//       return Notify.failure(error);
//     }

//     if (status === 'resolved') {
//       return <ImageGallery hits={gallery} />;
//     }

//     return (
//       <>
//         <Searchbar onSubmit={this.hendleFormSubmit} />
//       </>
//     );
//   }
// }

//ВАРІАНТ 2 Класичний

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
    this.setState({ isLoading: true });
    try {
      const { hits } = await getPhotosService(
        this.state.searchQuery,
        this.state.currentPage
      );
      this.setState({ gallery: hits });

      if (hits.length === 0) {
        this.setState({ error: 'Not data found' });
      }
      if (hits.length > 0) {
        this.setState({ gallery: hits });
      }
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  hendleFormSubmit = searchQuery => {
    this.setState({ error: null, searchQuery });
  };

  render() {
    const { error, gallery, isLoading } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.hendleFormSubmit} />
        {isLoading && <Loader />}
        {error && Notify.failure(error)}
        {gallery && gallery.length > 0 && <ImageGallery hits={gallery} />}
      </>
    );
  }
}

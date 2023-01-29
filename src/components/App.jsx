import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Audio } from 'react-loader-spinner';
import css from './App.module.css';
import Modal from 'components/Modal/Modal';

const KEY = '32133259-eb605dfa2d96a82515a2bf160';

class App extends Component {
  state = {
    items: [],
    value: '',
    page: 1,
    error: null,
    loading: false,
    showModal: false,
    imgUrl: '',
  };

  onSubmit = ({ value }) => {
    this.setState({
      value,
      items: [],
      page: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const nextSearch = this.state.value;
    if (prevState.value !== nextSearch || prevState.page !== page) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${nextSearch}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(({ hits }) =>
          this.setState(({ items }) => ({ items: [...items, ...hits] }))
        )
        .catch(({ error }) => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: true,
      imgUrl: largeImageURL,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: false,
    }));
  };

  render() {
    const { items, error, loading, showModal, imgUrl } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {error && <p>{error}</p>}
        {loading && <Audio />}
        <ImageGallery items={items} openModal={this.openModal} />
        {Boolean(items.length) && <Button onLoadMore={this.loadMore} />}
        {showModal && <Modal src={imgUrl} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default App;

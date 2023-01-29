import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  render() {
    const { items } = this.props;
    return (
      <ul className={css.ImageGallery}>
        {items &&
          items.map(item => (
            <ImageGalleryItem
              key={item.id}
              showModal={this.props.openModal}
              item={item}
            />
          ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

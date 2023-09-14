import * as basicLightbox from 'basiclightbox';

import React, { Component } from 'react';

export default class Modal extends Component {
  handleOpenModal = () => {
    const instance = basicLightbox.create(`
          <img src="assets/images/image.png" width="800" height="600">
        `);
    instance.show();
  };
  render() {
    return <div></div>;
  }
}

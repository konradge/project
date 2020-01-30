//Zeigt die Bilder der Unsplash Suche in einem Grid an

import React, { Component } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";
class UnsplashSearch extends Component {
  state = { images: [] };
  componentDidMount() {
    this.searchImages();
  }
  componentDidUpdate() {
    this.searchImages();
  }

  //Suche auf unsplash.com nach dem eingegebenen Suchwort
  async searchImages() {
    const request = await axios.get(
      "https://api.unsplash.com/search/photos?client_id=08a0aaca34c345e60dc6b0906c21421d7d71e0851bf5aec143584f75a506ddd9&query=" +
        this.props.keyword
    );
    const images = request.data.results.map(image => {
      return {
        alt: image.alt_description,
        imageURL: image.urls.regular,
        id: image.id
      };
    });
    this.setState({ images });
  }

  render() {
    const imageList = this.state.images.map(image => (
      <ImageCard
        key={image.id}
        image={image}
        setImage={image => this.props.setImage(image)}
      />
    ));
    return <div className="image-list">{imageList}</div>;
  }
}

export default UnsplashSearch;

import React, { Component } from "react";
import axios from "axios";
class UnsplashSearch extends Component {
  state = { images: [] };
  async componentDidUpdate() {
    const request = await axios.get(
      "https://api.unsplash.com/search/photos?client_id=08a0aaca34c345e60dc6b0906c21421d7d71e0851bf5aec143584f75a506ddd9&query=" +
        this.props.keyword
    );
    console.log(request.data.results);
    const images = request.data.results.map(image => {
      return { alt: image.alt_description, imageURL: image.urls.regular };
    });
    this.setState({ images });
    console.log(images);
  }
  render() {
    return this.state.images.map(image => (
      <img
        src={image.imageURL}
        alt={image.alt_description}
        width="20%"
        onClick={() => this.props.setImage(image)}
      />
    ));
  }
}

export default UnsplashSearch;

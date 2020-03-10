//Zeigt die Bilder in der passenden Größe an

import React from "react";

class ImageCard extends React.Component {
  state = { spans: 0 };
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }
  componentDidMount() {
    this.imageRef.current.addEventListener("load", () => this.setSpans());
  }

  // Berechne die Anzahl an Reihen, die das Bild benötigt
  setSpans() {
    if (this.imageRef.current) {
      const spans = Math.ceil(this.imageRef.current.clientHeight / 10);
      this.setState({ spans });
    }
  }
  render() {
    const { alt, imageURL } = this.props.image;

    return (
      <div style={{ gridRowEnd: "span " + this.state.spans }}>
        <img
          ref={this.imageRef}
          alt={alt}
          src={imageURL}
          onClick={() => this.props.setImage(imageURL)}
        />
      </div>
    );
  }
}

export default ImageCard;

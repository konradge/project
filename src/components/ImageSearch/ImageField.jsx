//Ermöglicht verschiedene Optionen, nach Bildern zu suchen (Unsplash/URL)

import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import ImageCard from "./ImageCard";
import { Loader } from "../Loader";

class ImageWrapper extends Component {
  baseURL =
    "https://api.unsplash.com/search/photos?client_id=08a0aaca34c345e60dc6b0906c21421d7d71e0851bf5aec143584f75a506ddd9";
  maxHeight = 400;
  state = {
    unsplashKeyword: "",
    customUrl: "",
    unsplashImages: null,
    imageStyle: {}
  };
  cancel;

  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }
  componentDidMount() {
    //Falls ein Bild existiert, berechne dessen Style
    if (this.imageRef.current) {
      this.calcImageStyle();
    }
  }

  componentDidUpdate() {
    //Falls noch kein Style berechnet wurde, berechne ihn neu
    if (this.imageRef.current && !this.state.imageStyle.height) {
      this.calcImageStyle();
    }
  }

  calcImageStyle() {
    this.imageRef.current.addEventListener("load", () => {
      const { width, height } = this.imageRef.current;
      const newHeight =
        height > this.maxHeight ? this.maxHeight : this.maxHeight;
      const newWidth = width * (newHeight / height);
      this.setState({ imageStyle: { height: newHeight, width: newWidth } });
    });
  }

  async searchImages(keyword) {
    //Suche nach eingegebenem Wort auf Unsplash. Sobald ein neuer Buchstabe
    // eingegeben wird, cancele die alte Anfrage und sende eine neue
    if (this.cancel !== undefined) {
      this.cancel();
    }
    try {
      const request = await axios.get(this.baseURL + "&query=" + keyword, {
        cancelToken: new axios.CancelToken(c => {
          this.cancel = c;
        })
      });
      const unsplashImages = request.data.results.map(image => {
        return {
          alt: image.alt_description,
          imageURL: image.urls.regular,
          id: image.id
        };
      });
      if (this.state.unsplashKeyword === keyword) {
        this.setState({ unsplashImages });
      }
    } catch {
      //Canceled
    }
  }

  //Anzeige der Suche nach den Wörtern des input-Feldes in UnsplashSearch
  imageSearch() {
    const { unsplashKeyword, unsplashImages } = this.state;
    if (unsplashKeyword) {
      if (unsplashImages === null) {
        return <Loader message={"Getting results for " + unsplashKeyword} />;
      } else if (unsplashImages.length === 0) {
        return (
          <div className="ui negative message">
            <div className="header">
              No results found for {unsplashKeyword}!
            </div>
            Please try another searchterm.
          </div>
        );
      } else {
        const imageList = unsplashImages.map(image => (
          <ImageCard
            key={image.id}
            image={image}
            setImage={image => {
              this.setState({ imageStyle: {} });
              this.props.onChange({
                target: {
                  value: {
                    showImage: true,
                    imageUrl: image
                  },
                  name: "image"
                }
              });
            }}
          />
        ));
        return <div className="image-list">{imageList}</div>;
      }
    } else {
      return <div>Type keyword to search image...</div>;
    }
  }
  render() {
    const { showImage, imageUrl, alt } = this.props.value;
    const { unsplashKeyword, customUrl } = this.state;
    //Falls bereits ein Bild gespeichert wurde, zeige dieses an. Bei klick auf Papierkorb wird das Bild wieder gelöscht
    if (showImage) {
      return (
        <div
          className="ui fluid rounded image exercise-image"
          style={this.state.imageStyle}
        >
          <a
            className="ui right corner red big label"
            href="delete-image"
            onClick={evt => evt.preventDefault()}
          >
            <i
              className="trash icon"
              onClick={() =>
                this.props.onChange({
                  target: {
                    value: {
                      showImage: false
                    },
                    name: "image"
                  }
                })
              }
            ></i>
          </a>
          <img src={imageUrl} alt={"Image of " + alt} ref={this.imageRef} />
        </div>
      );
    } else {
      //Es werden zwei Möglichkeiten, ein Bild hinzuzufügen, angeboten:
      //1. Gebe die URL eines Bildes an (Bestätigung durch ENTER)
      //2. Suche auf unsplash.com nach einem Bild.
      //  Sobald das Inputfeld angeklickt wird, können Ergebnisse in einem Popup (siehe Popup.jsx) gesehen werden
      return (
        <div>
          <div className="ui placeholder segment">
            <div className="ui two column very relaxed stackable grid">
              <div className="column">
                <div className="field">
                  <label htmlFor="urlInput">Provide image's URL:</label>
                  <input
                    id="urlInput"
                    value={customUrl}
                    onChange={event => {
                      this.setState({ customUrl: event.target.value });
                    }}
                    onFocus={() =>
                      this.setState({ imageUrlFieldFocused: true })
                    }
                    onBlur={() =>
                      this.setState({ imageUrlFieldFocused: false })
                    }
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();

                        this.props.onChange({
                          target: {
                            value: {
                              showImage: true,
                              imageUrl: customUrl
                            },
                            name: "image"
                          }
                        });
                        this.setState({ customUrl: "" });
                      }
                    }}
                  />
                  {this.state.imageUrlFieldFocused ? (
                    <div className="ui pointing label">
                      Press enter to set image
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="middle aligned column">
                <div className="field">
                  <label htmlFor="unsplashInput">Search in unsplash.com:</label>
                  <Popup
                    width="500px"
                    contentStyle={{ width: "430px" }}
                    trigger={
                      <input
                        type="text"
                        id="unsplashInput"
                        value={unsplashKeyword}
                        onChange={event => {
                          this.searchImages(event.target.value);

                          this.setState({
                            unsplashKeyword: event.target.value
                          });
                        }}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            this.searchImages(this.state.unsplashKeyword);
                          }
                        }}
                        autoComplete="off"
                      ></input>
                    }
                    on="focus"
                  >
                    {this.imageSearch()}
                  </Popup>
                </div>
              </div>
            </div>
            <div className="ui vertical divider">Or</div>
          </div>
        </div>
      );
    }
  }
}

export default ImageWrapper;

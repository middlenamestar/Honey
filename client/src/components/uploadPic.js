import React, { Component } from 'react';

class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {imageUrl: ''}
    }
    
    componentDidMount() {
        var myWidget = window.cloudinary.createUploadWidget(
            {
              cloudName: "df60zox38",
              uploadPreset: "adbsipsa"
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                  console.log("Done! Here is the image info: ", result.info);
                  this.setState({
                      imageUrl: result.info.url
                  })
                }
              }
            );
            document.getElementById("upload_widget").addEventListener(
                "click",
                function () {
                  myWidget.open();
                },
                false
              );
            }

    render() {
        return (
            <>
                <button id="upload_widget" className="cloudinary-button">
                upload*
                </button>
                <img src={this.state.imageUrl} alt="profile pic" />
            </>
        );
    }
}

export default ProfilePic;
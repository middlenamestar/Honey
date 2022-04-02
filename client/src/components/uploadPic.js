import React, { Component } from 'react';

const styles = {
    pic: {
        maxWidth: '300px'
    }
};

class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {imageUrl: ''}
    }
    
    componentDidMount() {
        var myWidget = window.cloudinary.createUploadWidget(
            {
                // cloud name is like my "database"
              cloudName: "df60zox38",
                // upload preset is like the "folder"/media library everything gets stored in.
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
            // this is like a standard code to be able to open the upload widget.
            document.getElementById("upload_widget").addEventListener(
                "click",
                function () {
                  myWidget.open();
                },
                false
              );
            }

    render() {
        // if imageurl (aka. if user uploads an image) then render the image. if not, the img tag will not appear.
        const imageUrl = this.state.imageUrl;
        let imageRender;
        if (imageUrl) {
            imageRender = <img src={this.state.imageUrl} alt="profile pic" style={styles.pic}/>
        }

        return (
            <>
                <div>
                    {imageRender}
                </div>
                <div>
                    <button id="upload_widget" className="">
                    upload
                    </button>
                </div>
            </>
        );
    }
}

export default ProfilePic;
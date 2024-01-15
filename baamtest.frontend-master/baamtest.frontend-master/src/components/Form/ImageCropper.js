import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Backdrop,
  CircularProgress,
  Slider,
  Button,
  Typography,
} from "@material-ui/core";
import { getOrientation } from "get-orientation/browser";

// import logoPlaceholder from "../../images/test/log-placeholder.jpg";
import defaultLogo from "../../images/logo-p.png";

import { getCroppedImg, getRotatedImage } from "./canvasUtils";
import useStyles from "./styles";
import { CloudUpload } from "@material-ui/icons";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { uploadUser } from "../../api/services/user";

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "#fff",
      },
      track: {
        color: "#fff",
      },
      rail: {
        color: "#999",
      },
    },
  },
});

const ORIENTATION_TO_ANGLE = {
  "3": 180,
  "6": 90,
  "8": -90,
};

const Demo = ({ image, onCloseModal, onChangeImage, isUpload }) => {
  const [imageSrc, setImageSrc] = React.useState(image);
  const [minZoom, setMinZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(20);
  const [croppedImage, setCroppedImage] = useState(null);

  var classes = useStyles();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      setIsLoading(true);
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
      );
      console.error("donee", { croppedImage });
      const file = await fetch(croppedImage)
        .then(r => r.blob())
        .then(
          blobFile =>
            new File([blobFile], "fileName.jpg", { type: blobFile.type }),
        );
      console.error("file", { file });

      var formdata = new FormData();
      formdata.append("file", file, "/D:/New folder (2)/107.jpg");

      let token = localStorage.getItem("userToken");

      if (isUpload) {
        uploadUser(formdata, token).then(res => {
          console.error(res);
          setIsLoading(false);
          onChangeImage(croppedImage);
          onCloseModal();
          window.location.reload();
        });
      } else {
        setIsLoading(false);
        onChangeImage(croppedImage);
        onCloseModal();
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.error("file0", { file });
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <Backdrop
        style={{ zIndex: 1000000, color: "#fff" }}
        open={isLoading}
        onClick={() => console.log("clicked")}
      >
        <CircularProgress color="#fff" />
      </Backdrop>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={0.9773 / 1}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{
                width: window.screen.height * 0.65,
                height: window.screen.height * 0.7,
              }}
              onMediaLoaded={mediaSize => {
                // Adapt zoom based on media size to fit max height
                setZoom(
                  (window.screen.height * 0.65) / mediaSize.naturalHeight,
                );
                setMinZoom(
                  (window.screen.height * 0.65) / mediaSize.naturalHeight,
                );
              }}
            />
          </div>
          <div className={classes.controls}>
            <div style={{ display: "flex", width: "50%" }}>
              <div className={classes.sliderContainer}>
                <ThemeProvider theme={muiTheme}>
                  <Slider
                    value={zoom}
                    min={minZoom}
                    max={minZoom + 3}
                    color="#fff"
                    step={0.1}
                    aria-labelledby="Zoom"
                    classes={{ root: classes.slider }}
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </ThemeProvider>
                <Typography
                  variant="overline"
                  classes={{ root: classes.sliderLabel }}
                >
                  بزرگنمایی
                </Typography>
              </div>
              <div className={classes.sliderContainer}>
                <ThemeProvider theme={muiTheme}>
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    classes={{ root: classes.slider }}
                    onChange={(e, rotation) => setRotation(rotation)}
                  />
                </ThemeProvider>
                <Typography
                  variant="overline"
                  classes={{ root: classes.sliderLabel }}
                >
                  چرخش
                </Typography>
              </div>
            </div>
            <div style={{ display: "flex", paddingBottom: 20 }}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                hidden
                onChange={onFileChange}
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="default"
                  component="span"
                  startIcon={<CloudUpload />}
                  style={{ borderRadius: 50, height: 40, boxShadow: "none" }}
                  classes={{ root: classes.cropButton }}
                >
                  انتخاب عکس
                </Button>
              </label>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="default"
                classes={{ root: classes.cropButton }}
              >
                ثبت تغییرات
              </Button>
              <Button
                onClick={onCloseModal}
                variant="contained"
                color="default"
                classes={{ root: classes.cropButton }}
              >
                لغو تغییرات
              </Button>
              {image && (
                <Button
                  onClick={() => {
                    onChangeImage(defaultLogo);
                    onCloseModal();
                  }}
                  variant="contained"
                  color="default"
                  classes={{ root: classes.cropButton }}
                >
                  لوگو پیش فرض
                </Button>
              )}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
    </div>
  );
};

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

// const StyledDemo = withStyles(styles)()

export default Demo;

import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "170px",
        height: '170px',
        overflow: "hidden",
        position: "relative",
        border: `3px dashed ${theme.palette.grey[500_80]}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // [theme.breakpoints.down('sm')]: {
        //   width: "100%",
        // },
    },
    button: {
        backgroundColor: theme.palette.grey[500_80],
        '&:hover': {
            backgroundColor: theme.palette.grey[500_80]
        }
    }
}));

const ImagePreview = (props) => {
    const { logo, onFileSelectSuccess, onFileSelectError } = props;
    const classes = useStyles();
    const [preview, setPreview] = useState();


    useEffect(() => {
        if (logo) {
            setPreview(logo)
        }
    }, [logo])


    const onSelectFile = (e) => {

        if (e.target.files) {
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setPreview(objectUrl);
            const file = e.target.files[0];
            const convertInMb = file.size / 1000000
            if (convertInMb > 1) {
                onFileSelectError({ error: "File size cannot exceed more than 1MB" });
                setPreview(logo)
            }
            else onFileSelectSuccess(file);
        }

    }

    return (
        // eslint-disable-next-line no-template-curly-in-string
        <Box className={classes.root} style={{ backgroundImage: `url(${preview})`, backgroundSize: "100% 100%" }}>
            <Button
                variant="contained"
                component="label"
                className={classes.button}
            >

                {/* {console.log("preview", preview)} */}
                {preview ? "Change Image" : "Upload Image"}
                <input
                    type="file"
                    onChange={onSelectFile}
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                />
            </Button>
        </Box>
    )
}

export default ImagePreview
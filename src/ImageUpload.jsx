import React, {useState} from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {db, storage} from "./firebase";
import firebase from "firebase";

export const ImageUploader = ({setOpenNewpost, userName}) => {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState('')
    const [progress, setProgress] = useState(0)

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            error => console.log(error),
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            ImageUrl: url,
                            userName: userName,
                        })
                        setProgress(0)
                        setCaption('')
                        setImage(null)
                    })
            }
        )
        setOpenNewpost(false)
    }

    return (
        <div className="uploader">
            <div className='uploader__wrapper'>
                <Input
                    type="text"
                    placeholder="Enter a caption..."
                    onChange={event => setCaption(event.target.value)}
                    value={caption}
                    className="uploader__item uploader__caption"
                />
                <Input className="uploader__item" type="file" onChange={handleChange}/>
                <Button className="uploader__item" onClick={handleUpload}>Upload</Button>
            </div>
            <progress className="uploader__progress" value={progress} max='100'></progress>
        </div>
    )
}
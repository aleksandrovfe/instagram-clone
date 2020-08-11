import React, {useEffect, useState} from "react";
import {db} from "../../firebase";
import firebase from "firebase";
import {Comment} from "./Comment";
import {AddComment} from "./AddComment";

export const CommentContainer = ({user, postId}) => {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    const postComment = (event) => {
        event.preventDefault()

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            userName: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setComment('')
    }

    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => ({
                        comment: doc.data(),
                        id: doc.id,
                    })))
                })
        }

        return () => {
            unsubscribe()
        }
    }, [postId])


    return (
        <div>
            <Comment comments={comments}/>
            <AddComment postComment={postComment} user={user} setComment={setComment} comment={comment}/>
        </div>
    )
}
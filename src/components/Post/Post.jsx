import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {CommentContainer} from "../Comment/CommentContainer";

export const Post = ({ user, postId, userName, imageUrl, caption }) => {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt='username'
                    src="/assets/5.jpg"
                />
                <h3 className="post__user-name">{userName}</h3>
            </div>
            <img
                className="post__image"
                src={imageUrl}
                alt=""
            />
            <h4 className="post__text"><strong>{userName}: </strong>{caption}</h4>

            <CommentContainer user={user} postId={postId}/>
        </div>
    )
}
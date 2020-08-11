import React from "react";
import {Post} from "./Post";

export const PostContainer = ({ user, postId, userName, imageUrl, caption }) => {
    return (
        <Post postId={postId} user={user} userName={userName} imageUrl={imageUrl} caption={caption}/>
    )
}
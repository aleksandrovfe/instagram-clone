import React from "react";

export const Comment = ({ comments }) => {
    return (
        <div>
            {
                comments.map(({id, comment}) => (
                    <p className="comments__text" key={id}>
                        <b>{comment.userName}</b> {comment.text}
                    </p>
                ))
            }
        </div>
    )
}
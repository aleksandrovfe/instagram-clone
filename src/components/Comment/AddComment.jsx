import React from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

export const AddComment = ({ user, comment, setComment, postComment }) => {
    return (
        <div>
            {user
                ?  (
                    <form className="post__form-add-comment">
                        <Input
                            className="post__input-comment"
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={event => setComment(event.target.value)}
                        />
                        <Button
                            className="post__btn-add-comment"
                            disabled={!comment}
                            type="submit"
                            onClick={postComment}
                        >
                            post
                        </Button>
                    </form>
                )
                : null
            }
        </div>
    )
}
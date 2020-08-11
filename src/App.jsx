import React, {useEffect, useState} from 'react';
import './App.scss';
import {db, auth} from './firebase'
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {ImageUploader} from "./ImageUpload";
import Avatar from "@material-ui/core/Avatar";
import {PostContainer} from "./components/Post/PostContainer";
import TextField from "@material-ui/core/TextField";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function App() {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false)
    const [openSignIn, setOpenSignIn] = useState(false)
    const [openNewPost, setOpenNewpost] = useState(false)
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const signUp = (event) => {
        event.preventDefault()

        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                return authUser.user.updateProfile({
                    displayName: userName
                })
            })
            .catch((error) => alert(error.message))

        setOpen(false)
    }

    const signIn = (event) => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

        setOpenSignIn(false)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser)
            } else {
                setUser(null)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [user, userName])

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })))
        })

        setOpenNewpost(false)
    }, [])

    return (
        <div className="app">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__modal" >
                        <img
                            className='app__modal-image'
                            src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png"
                            alt="logo"
                        />
                        <TextField
                            placeholder="User name"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button disabled={!userName} onClick={signUp}>Sign up</Button>
                    </form>
                </div>
            </Modal>


            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__modal">
                        <img
                            className='app__modal-image'
                            src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png"
                            alt="logo"
                        />
                        <TextField
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={signIn}>Sign In</Button>
                    </form>
                </div>
            </Modal>

            <header className='app__header'>
                <div className="app__header-login">
                    <img
                        className='app__header-image'
                        src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png"
                        alt="logo"
                    />
                    {user
                        ?   (<div className="app__header-login-wrapper">
                                <Avatar className="post__avatar"  alt='username' src="/assets/5.jpg" />
                                <p className="app__user-name">{user.displayName}</p>
                                <Button onClick={() => setOpenNewpost(true)}>New post</Button>
                            </div>
                        ) : null
                    }
                </div>
                {user
                    ?   (<Button onClick={() => auth.signOut()}>Logout</Button>)
                    :   (
                        <div>
                            <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
                            <Button onClick={() => setOpen(true)}>Sign up</Button>
                        </div>
                        )
                }
            </header>

            <section className="app__body">
                <Modal
                    open={openNewPost}
                    onClose={() => setOpenNewpost(false)}
                >
                    <div style={modalStyle} className={classes.paper}>
                        {user?.displayName ? (<ImageUploader setOpenNewpost={setOpenNewpost} userName={user.displayName}/>) : <h3 className='app__body-upload-unauth'>Log in to upload</h3>}
                    </div>
                </Modal>

                {
                    posts.map(({id, post}) => (
                        <React.Fragment key={id}>
                            <PostContainer
                                user={user}
                                postId={id}
                                userName={post.userName}
                                caption={post.caption}
                                imageUrl={post.ImageUrl}
                            />
                        </React.Fragment>
                    ))
                }
            </section>
        </div>
    );
}

export default App;

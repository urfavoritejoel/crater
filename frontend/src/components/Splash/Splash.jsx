import React, { useEffect, useState } from 'react';
import { updateUserThunk } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsThunk } from '../../redux/posts';
import { PostComponent } from '../Posts';
import { NavLink } from 'react-router-dom';

const Splash = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const posts = useSelector(state => state.posts.allPosts);
  let otherPosts = [];
  if (user) otherPosts = posts.filter(post => post.userId !== user.id);

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  //image url to send to aws
  // const [imgUrl, setImgUrl] = useState("");
  //telling us if we should show the image
  // const [showUpload, setShowUpload] = useState(true);
  //img url we will load in react
  // const [previewUrl, setPreviewUrl] = useState("");



  //function to get image from local

  // const updateImage = async (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (e) => {
  //     setPreviewUrl(reader.result);
  //   }
  //   setImgUrl(file);
  //   setShowUpload(false);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const img_url = imgUrl;
  //   const form = { img_url };
  //   const updateUser = await dispatch(updateUserThunk(user.id, form))
  // }



  return (
    <div>
      <h1>Welcome</h1>
      {/* <form onSubmit={handleSubmit}>
        <div>
          {showUpload && (
            <label htmlFor='file-upload'> Select From Computer
              <input
                type='file'
                id='file-upload'
                name="img_url"
                onChange={updateImage}
                accept='.jpg, .jpeg, .png, .gif'
              />
            </label>
          )}
          {!showUpload && (
            <div>
              <img
                src={previewUrl}
                alt="preview"
              />
              <button>Change Profile</button>
            </div>
          )}
        </div>
      </form> */}

      {user ?
        <>
          <h2>Discover other Creators:</h2>
          {otherPosts.map(post => (
            <div className={'postContainer'} key={post.id}>
              <h2>{post?.title}</h2>
              <p>{post?.body}</p>
              <NavLink to={`/users/${post?.User?.id}/page`}>
                {post?.User?.username}
              </NavLink>
            </div>
          ))}
        </>
        :
        <>
          <h2>Discover Creators:</h2>
          {posts.map(post => (
            <div className={'postContainer'} key={post.id}>
              <h2>{post?.title}</h2>
              <p>{post?.body}</p>
              <NavLink to={`/users/${post?.User?.id}/page`}>
                {post?.User?.username}
              </NavLink>
            </div>
          ))}
        </>
      }
    </div>
  );
}

export default Splash;

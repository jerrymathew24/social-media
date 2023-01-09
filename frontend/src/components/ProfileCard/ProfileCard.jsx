import React from "react";
import { useSelector } from "react-redux";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = ({ location }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=> state.postReducer.posts)
  console.log(user, "justinnnnnnnnnnnnnnn");
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "cover.jpg"
          }
          alt=""
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.webp"
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.data.user.firstname} {user.data.user.lastname}
        </span>
        <span>
          {user.data.user.status ? user.data.user.status : "Update Status"}
        </span>
      </div>
      <div className="followStatus">
        <hr />
        <div className="">
          <div className="follow">
            <span>{user.data.user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.data.user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=> post.userId === user.data.user._id).length}</span>
                <span> Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;

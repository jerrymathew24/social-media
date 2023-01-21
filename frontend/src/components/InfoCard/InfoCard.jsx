import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { BiPencil } from "react-icons/bi";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest.js";
import { logOut } from "../../actions/AuthAction.js";

function InfoCard() {
  const [modalOpened, setModalOpened] = useState(false);

  //redux
  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        // checking our own profile
        setProfileUser(user);
      }
      // checking profile of another person
      else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };

    fetchProfileUser();
  }, [user]);

  //logout
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <BiPencil onClick={() => setModalOpened(true)} />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span> {profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span> {profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works At</b>
        </span>
        <span> {profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default InfoCard;

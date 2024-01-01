import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import Profile from "./Profile";

const UserDetails = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.user.users);

  const user = useMemo(() => {
    return users.find((user) => user._id === id);
  }, [users, id]);

  return <Profile userDetails={user} />;
};

export default UserDetails;

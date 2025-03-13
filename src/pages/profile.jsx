import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.quiz.user);
  return (
    <h1>
      Bienvenue {user?.nom} {user?.prénom}
    </h1>
  );
};
export default Profile;

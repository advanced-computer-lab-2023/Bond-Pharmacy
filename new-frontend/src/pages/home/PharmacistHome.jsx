import { useParams } from "react-router-dom";

const PharmacistHome = () => {
  const { username } = useParams();
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
};

export default PharmacistHome;

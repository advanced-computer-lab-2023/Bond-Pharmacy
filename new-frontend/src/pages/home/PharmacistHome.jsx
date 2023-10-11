
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const PharmacistHome = () => {
  const { username } = useParams();
  return (
    <div>
      <h1>{username}</h1>
      <Button href="/doctor/home/add-medicine">Add Medicine</Button>
      <Button href="/doctor/home/get-medicines">View Medicines</Button>
    </div>
  );
};

export default PharmacistHome;

import axios from 'axios'

export const fetchUser = async () => {
    const res = await axios.get("localhost:5000/auth/info");
    console.log(res.data)
    return res.data.user;
  };
  

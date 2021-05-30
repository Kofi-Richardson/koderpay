
import axios from "axios";



  try {
    const response = await axios
      .create({
        baseURL: "http://localhost:4000",
      })
      .get(`/koder/api/v1.0/fees?registration_number=${id}`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
        }
      });
    return response;
  } catch (err) {
      console.log(err)
    return err;
  }
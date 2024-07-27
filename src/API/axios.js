import axios from 'axios'

const axiosInstance= axios.create(
   {
      //local firebase function baseurl
      /* baseUrl: "http://127.0.0.1:5001/clone-f6ae6/us-central1/api", */

      //deployed firbase function baseur;
      baseURL:"https://api-vfn556glta-uc.a.run.app"

      //deplyed on render baseurl
      //baseURL:"https://amazon-api-deploy-mkw0.onrender.com/"


   }
)
export {axiosInstance}

import axios from 'axios';
import FormData from 'form-data';

function uploadImageToCloud(imageFile) {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/zeze-andela/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'oenu8grd';

  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  delete axios.defaults.headers.common['x-token'];
  return axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    data: formData,
  });
}

export default uploadImageToCloud;

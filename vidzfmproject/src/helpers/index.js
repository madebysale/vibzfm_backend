require('dotenv').config();
var aesEcb = require('aes-ecb');

export const successResponse = (req, res, data, message = 'success', code = 200) => res.send(encrypt({
  code,
  data,
  message,
  success: true,
}));
export const successResponse1 = (req, res, data, message = 'Agreement created', code = 200) => res.send(encrypt({
  code,
  data,
  message,
  success: true,
}));
export const successResponse2 = (req, res, data, message = 'Email or phone number already exists', code = 400) => res.send(encrypt({
  code,
  data,
  message,
  success: true,
}));




export const errorResponse = (
  req,
  res,
  message = 'Something went wrong',
  code = 500,
  error = {},
) => res.status(500).json(encrypt({
  code,
  message,
  error,
  data: {},
  success: false,
}));

export const errorResponse1 = (
  req,
  res,
 
  code = 200,
  error = { message : 'Email or phone number already exists'},
) => res.status(200).json(encrypt({
  code,
  message,
  error,
  data: {},
  success: false,
}));

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(', ')} are required fields.` : '';
};

export const uniqueId = (length = 13) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const encrypt = (data) => {
  return data;
  const keyString = process.env.AES_SECRET;
  const result = aesEcb.encrypt(keyString, JSON.stringify(data));
  var json = {
    "data" : result
  }
  return json;  
};
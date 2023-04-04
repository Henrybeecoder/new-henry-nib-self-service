var CryptoJS = require("crypto-js");

export const setLocalStorageItem = (key: string, value: string) => {
  let encryptedData = CryptoJS.AES.encrypt(value, "dope encryption").toString();
  localStorage.setItem(key, encryptedData);
};

export const getLocalStorageItem = (key: string) => {
  if (localStorage.getItem(key)) {
    var bytes = CryptoJS.AES.decrypt(
      localStorage.getItem(key),
      "dope encryption"
    );
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(originalText)
    // console.log(JSON.parse(originalText))
    if (key === "accessToken") {
      return originalText;
    }
    return JSON.parse(originalText);
  }
  return "";
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

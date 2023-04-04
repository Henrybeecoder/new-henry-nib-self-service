import CryptoJS from "crypto-js";
export const key = "zAL7X5AVRm8l4Ifs";
export const IV = "BE/s3V0HtpPsE+1x";
export const secretKey = CryptoJS.enc.Utf8.parse(key);
export const intiVector = CryptoJS.enc.Utf8.parse(IV);

export const encryptAes = (data: any) => {
  const preEncrypteds = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, {
    iv: intiVector,
    mode: CryptoJS.mode.CBC,
  });
  const result = preEncrypteds.toString(CryptoJS.format.Hex);
  console.log(result);
  return result;
};

export const deCryptedData = (data: any) => {
  const dataHex = CryptoJS.enc.Hex.parse(data);
  const preDecrypted = CryptoJS.AES.decrypt(
    { ciphertext: dataHex },
    secretKey,
    { iv: intiVector, mode: CryptoJS.mode.CBC }
  );
  const encDecrypted = preDecrypted.toString(CryptoJS.enc.Utf8);
  const decrypted = JSON.parse(encDecrypted);
  console.log(decrypted);
  return decrypted;
};

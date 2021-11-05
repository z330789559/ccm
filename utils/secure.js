import crypto from "crypto";

const validString =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890";

export const rands = (len = 6) => {
  return Array(len)
    .fill()
    .map(() => validString[(Math.random() * 62) | 0])
    .join("");
};

export const params = (obj) => {
  return Object.entries(obj)
    .map(([k, v]) => k + "=" + v)
    .join("&");
};

export const sparams = (obj) => {
  return Object.keys(obj)
    .sort()
    .map((k) => k + "=" + obj[k])
    .join("&");
};

export const md5s = (str) => {
  return crypto.createHash("md5").update(str).digest("hex");
};

export const aesenc = (key, str) => {
  const cipher = crypto.createCipher("aes128", key);
  let crypted = cipher.update(str, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

export const aesdec = (key, encrypted) => {
  const decipher = crypto.createDecipher("aes128", key);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

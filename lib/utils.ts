import crypto from "crypto";

export const formatDate = (rawDate?: Date) => {
  if (!rawDate) return "";

  const dObj = new Date(rawDate);
  const year = dObj.getFullYear().toString().slice(2);
  const month = String(dObj.getMonth() + 1).padStart(2, "0");
  const date = String(dObj.getDate()).padStart(2, "0");

  return `${year}.${month}.${date}`;
};

export const generateSaltedHash = (pw: string): string => {
  const pwSalt = process.env.PW_SALT;
  if (pwSalt === undefined) {
    throw Error("Env Error");
  }
  const hashedPassword = crypto
    .createHmac("sha3-512", pwSalt)
    .update(pw)
    .digest("hex");
  return hashedPassword;
};

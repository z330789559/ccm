export const getCookies = (req) =>
  parseCookie(
    typeof window === 'undefined' ? req?.headers?.cookie : document.cookie
  );

export const setCookie = (k, v, exdays) => {
  if (typeof window !== 'undefined') {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    document.cookie = `${k}=${v};expires=${d.toUTCString()};path=/`;
  }
};

export const removeCookie = (k) => {
  setCookie(k, '', -1);
};

const parseCookie = (cookieStr) => {
  const cookies = {};
  if (cookieStr) {
    cookieStr.split(';')?.forEach((cookie) => {
      const parts = cookie.match(/(.*?)=(.*)$/);
      cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
  }
  return cookies;
};

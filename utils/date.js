const placezero = (num) => {
  return num > 10 ? '' + num : '0' + num;
};

export const dateid = () => {
  const cur = new Date();
  return (
    placezero(cur.getHours()) +
    placezero(cur.getMinutes()) +
    placezero(cur.getSeconds()) +
    placezero(cur.getDate()) +
    ('' + Math.random()).substring(2, 6)
  );
};

export const format = (date) => {
  if (date) {
    return (
      placezero(date.getFullYear()) +
      '-' +
      placezero(date.getMonth() + 1) +
      '-' +
      placezero(date.getDate()) +
      ' ' +
      placezero(date.getHours()) +
      ':' +
      placezero(date.getMinutes()) +
      ':' +
      placezero(date.getSeconds())
    );
  } else {
    return null;
  }
};

/*
  Convert unix timestamp to something that doesn't suck
*/
export const getDuration = (timestamp, lang, number = 1) => {
  var millis = Date.now() - timestamp * 1000;
  var dur = [];
  var units = [
    { labelZh: '毫秒', label: 'millis', mod: 1000 },
    { labelZh: '秒', label: 'seconds', mod: 60 },
    { labelZh: '分钟', label: 'mins', mod: 60 },
    { labelZh: '小时', label: 'hours', mod: 24 },
    { labelZh: '天', label: 'days', mod: 365 },
    { labelZh: '年', label: 'years', mod: 1000 },
  ];
  // calculate the individual unit values
  units.forEach(function (u) {
    var val = millis % u.mod;
    millis = (millis - val) / u.mod;
    if (u.label == 'millis') return;
    if (val > 0)
      dur.push({ label: lang === 'en' ? u.label : u.labelZh, val: val });
  });
  // convert object to string representation
  dur.toString = function () {
    return dur
      .reverse()
      .slice(0, number)
      .map(function (d) {
        return (
          d.val +
          ' ' +
          (d.val == 1 && lang === 'en' ? d.label.slice(0, -1) : d.label)
        );
      })
      .join(lang === 'en' ? ', ' : ' ');
  };
  return dur;
};

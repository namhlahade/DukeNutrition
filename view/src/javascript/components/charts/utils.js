import colorLib from '@kurkle/color';
import {DateTime} from 'luxon';
import 'chartjs-adapter-luxon';
import {valueOrDefault} from '../../../../../view/node_modules/chart.js/dist/helpers.js';

// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
var _seed = Date.now();

export function srand(seed) {
  _seed = seed;
}

export function rand(min, max) {
  min = valueOrDefault(min, 0);
  max = valueOrDefault(max, 0);
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

export function numbers(config) {
  var cfg = config || {};
  var min = valueOrDefault(cfg.min, 0);
  var max = valueOrDefault(cfg.max, 100);
  var from = valueOrDefault(cfg.from, []);
  var count = valueOrDefault(cfg.count, 8);
  var decimals = valueOrDefault(cfg.decimals, 8);
  var continuity = valueOrDefault(cfg.continuity, 1);
  var dfactor = Math.pow(10, decimals) || 0;
  var data = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + this.rand(min, max);
    if (this.rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

export function points(config) {
  const xs = this.numbers(config);
  const ys = this.numbers(config);
  return xs.map((x, i) => ({x, y: ys[i]}));
}

export function bubbles(config) {
  return this.points(config).map(pt => {
    pt.r = this.rand(config.rmin, config.rmax);
    return pt;
  });
}

export function labels(config) {
  var cfg = config || {};
  var min = cfg.min || 0;
  var max = cfg.max || 100;
  var count = cfg.count || 8;
  var step = (max - min) / count;
  var decimals = cfg.decimals || 8;
  var dfactor = Math.pow(10, decimals) || 0;
  var prefix = cfg.prefix || '';
  var values = [];
  var i;

  for (i = min; i < max; i += step) {
    values.push(prefix + Math.round(dfactor * i) / dfactor);
  }

  return values;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var values = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

const COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba'
];

export function color(index) {
  return COLORS[index % COLORS.length];
}

export function transparentize(value, opacity) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export const CHART_COLORS = {
  coral: 'rgb(255, 127, 80)',
  gold: 'rgb(255, 215, 0)',
  purple: 'rgb(153, 102, 255)',
  orange: 'rgb(255, 159, 64)',
  blue: 'rgb(54, 162, 235)',
  grey: 'rgb(201, 203, 207)',
  pink: 'rgb(255, 192, 203)',
  red: 'rgb(255, 99, 132)',
  green: 'rgb(75, 192, 192)',
  lime: 'rgb(50, 205, 50)',
  cyan: 'rgb(0, 255, 255)',
  teal: 'rgb(0, 128, 128)',
  indigo: 'rgb(75, 0, 130)',
  salmon: 'rgb(250, 128, 114)',
  gold: 'rgb(255, 215, 0)',
  lavender: 'rgb(230, 230, 250)',
  maroon: 'rgb(128, 0, 0)',
  olive: 'rgb(128, 128, 0)',
  navy: 'rgb(0, 0, 128)',
  turquoise: 'rgb(64, 224, 208)',
  violet: 'rgb(238, 130, 238)',
  chocolate: 'rgb(210, 105, 30)',
  plum: 'rgb(221, 160, 221)',
};


const NAMED_COLORS = [
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.grey,
];

export function namedColor(index) {
  return NAMED_COLORS[index % NAMED_COLORS.length];
}

export function newDate(days) {
  return DateTime.now().plus({days}).toJSDate();
}

export function newDateString(days) {
  return DateTime.now().plus({days}).toISO();
}

export function parseISODate(str) {
  return DateTime.fromISO(str);
}
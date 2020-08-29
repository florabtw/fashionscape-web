const isDev = process.env.NODE_ENV === 'development';
const isRS3 = window.location.hostname === 'rune.scape.fashion';

const env = isDev ? 'development' : isRS3 ? 'runescape' : 'oldschool';

console.log('env', env);

const config = {
  oldschool: {
    api: 'https://api.scape.fashion',
  },
  runescape: {
    api: 'https://api.rune.scape.fashion',
  },
  development: {
    api: 'http://dev.nick.exposed:8000',
  },
}[env];

module.exports = config;

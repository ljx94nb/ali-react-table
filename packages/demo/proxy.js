const fs = require('fs');

function fromJSONFile(filename) {
  return (req, res) => {
    const data = fs.readFileSync(`src/mock/${filename}.json`).toString();
    const json = JSON.parse(data);
    return res.json(json);
  };
}
const proxy = {
  'GET /data': fromJSONFile('data'),
  'GET /detail_data': fromJSONFile('detail_data')
};
module.exports = proxy;

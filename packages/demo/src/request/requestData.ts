interface RequestI {
  url: string;
}

export const requestData = (options: RequestI) => {
  const { url } = options;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

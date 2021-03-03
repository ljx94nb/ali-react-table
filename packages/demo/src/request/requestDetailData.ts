interface RequestI {
  key: string
}

export const requestDetailData = (options: RequestI) => {
  const { key } = options
  return new Promise((resolve, reject) => {
    fetch('large_detail_data')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        resolve(data[key])
      })
      .catch((err) => {
        reject(err)
      })
  })
}

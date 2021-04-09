export const getValues = async (requestPathArr: string[], targets: string[], sortOption: any): Promise<any> => {
  try {
    const requestPathArrStr = encodeURIComponent(JSON.stringify(requestPathArr))
    const targetsStr = encodeURIComponent(JSON.stringify(targets))
    const sortOptionStr = encodeURIComponent(JSON.stringify(sortOption))
    const data = await fetch(
      `http://localhost:3002/get_values?requestPathArrStr=${requestPathArrStr}&targetsStr=${targetsStr}&sortOptionStr=${sortOptionStr}`,
    ).then((res) => res.json())
    return data
  } catch (err) {
    throw new Error(err)
  }
}

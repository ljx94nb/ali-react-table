interface Result {
  目标收入: number
  实际收入: number
  目标达成率: number
  收入月环比: number
}

export const getValues = <Result>(requestPath: string[], targets: string[]) => {
  const str = JSON.stringify(requestPath)
  if (str === '["forenoon","上半年"]') {
    return ({
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    } as unknown) as Result
  }
  if (str === '["forenoon","下半年"]') {
    return ({
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    } as unknown) as Result
  }
  if (str === '["afternoon","上半年"]') {
    return ({
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    } as unknown) as Result
  }
  if (str === '["afternoon","下半年"]') {
    return ({
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    } as unknown) as Result
  }
  if (str === '["evening","上半年"]') {
    return ({
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    } as unknown) as Result
  }
  if (str === '["evening","下半年"]') {
    return ({
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    } as unknown) as Result
  }

  if (str === '["forenoon","forenoon-9","上半年"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["forenoon","forenoon-9","下半年"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["afternoon","afternoon-9","上半年"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["afternoon","afternoon-9","下半年"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["evening","evening-9","上半年"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["evening","evening-9","下半年"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["forenoon","forenoon-10","上半年"]') {
    return ({
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    } as unknown) as Result
  }
  if (str === '["forenoon","forenoon-10","下半年"]') {
    return ({
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    } as unknown) as Result
  }
  if (str === '["afternoon","afternoon-10","上半年"]') {
    return ({
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    } as unknown) as Result
  }
  if (str === '["afternoon","afternoon-10","下半年"]') {
    return ({
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    } as unknown) as Result
  }
  if (str === '["evening","evening-10","上半年"]') {
    return ({
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    } as unknown) as Result
  }
  if (str === '["evening","evening-10","下半年"]') {
    return ({
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    } as unknown) as Result
  }

  if (str === '["forenoon","forenoon-11","上半年"]') {
    return ({
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    } as unknown) as Result
  }
  if (str === '["forenoon","forenoon-11","下半年"]') {
    return ({
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    } as unknown) as Result
  }
  if (str === '["afternoon","afternoon-11","上半年"]') {
    return ({
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    } as unknown) as Result
  }
  if (str === '["afternoon","afternoon-11","下半年"]') {
    return ({
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    } as unknown) as Result
  }
  if (str === '["evening","evening-11","上半年"]') {
    return ({
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    } as unknown) as Result
  }
  if (str === '["evening","evening-11","下半年"]') {
    return ({
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    } as unknown) as Result
  }

  if (str === '["forenoon","上半年","2020-01"]') {
    return ({
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    } as unknown) as Result
  }
  if (str === '["forenoon","上半年","2020-02"]') {
    return ({
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    } as unknown) as Result
  }
  if (str === '["forenoon","上半年","2020-03"]') {
    return ({
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    } as unknown) as Result
  }
  if (str === '["forenoon","上半年","2020-04"]') {
    return ({
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    } as unknown) as Result
  }
  if (str === '["forenoon","上半年","2020-05"]') {
    return ({
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    } as unknown) as Result
  }
  if (str === '["forenoon","上半年","2020-06"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["afternoon","上半年","2020-01"]') {
    return ({
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    } as unknown) as Result
  }
  if (str === '["afternoon","上半年","2020-02"]') {
    return ({
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    } as unknown) as Result
  }
  if (str === '["afternoon","上半年","2020-03"]') {
    return ({
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    } as unknown) as Result
  }
  if (str === '["afternoon","上半年","2020-04"]') {
    return ({
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    } as unknown) as Result
  }
  if (str === '["afternoon","上半年","2020-05"]') {
    return ({
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    } as unknown) as Result
  }
  if (str === '["afternoon","上半年","2020-06"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["evening","上半年","2020-01"]') {
    return ({
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    } as unknown) as Result
  }
  if (str === '["evening","上半年","2020-02"]') {
    return ({
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    } as unknown) as Result
  }
  if (str === '["evening","上半年","2020-03"]') {
    return ({
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    } as unknown) as Result
  }
  if (str === '["evening","上半年","2020-04"]') {
    return ({
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    } as unknown) as Result
  }
  if (str === '["evening","上半年","2020-05"]') {
    return ({
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    } as unknown) as Result
  }
  if (str === '["evening","上半年","2020-06"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["forenoon","下半年","2020-07"]') {
    return ({
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    } as unknown) as Result
  }
  if (str === '["forenoon","下半年","2020-08"]') {
    return ({
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    } as unknown) as Result
  }
  if (str === '["forenoon","下半年","2020-09"]') {
    return ({
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    } as unknown) as Result
  }
  if (str === '["forenoon","下半年","2020-10"]') {
    return ({
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    } as unknown) as Result
  }
  if (str === '["forenoon","下半年","2020-11"]') {
    return ({
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    } as unknown) as Result
  }
  if (str === '["forenoon","下半年","2020-12"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["afternoon","下半年","2020-07"]') {
    return ({
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    } as unknown) as Result
  }
  if (str === '["afternoon","下半年","2020-08"]') {
    return ({
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    } as unknown) as Result
  }
  if (str === '["afternoon","下半年","2020-09"]') {
    return ({
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    } as unknown) as Result
  }
  if (str === '["afternoon","下半年","2020-10"]') {
    return ({
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    } as unknown) as Result
  }
  if (str === '["afternoon","下半年","2020-11"]') {
    return ({
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    } as unknown) as Result
  }
  if (str === '["afternoon","下半年","2020-12"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
  if (str === '["evening","下半年","2020-07"]') {
    return ({
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    } as unknown) as Result
  }
  if (str === '["evening","下半年","2020-08"]') {
    return ({
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    } as unknown) as Result
  }
  if (str === '["evening","下半年","2020-09"]') {
    return ({
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    } as unknown) as Result
  }
  if (str === '["evening","下半年","2020-10"]') {
    return ({
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    } as unknown) as Result
  }
  if (str === '["evening","下半年","2020-11"]') {
    return ({
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    } as unknown) as Result
  }
  if (str === '["evening","下半年","2020-12"]') {
    return ({
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    } as unknown) as Result
  }
}

export const getCellValue = (rowKey: string, key: string) => {
  const config: any = {
    forenoon: {
      上半年: {
        目标收入: 1,
        实际收入: 1,
        目标达成率: 1,
        收入月环比: 1,
      },
      '2020-01': '2020-01',
      '2020-02': '2020-02',
      '2020-03': '2020-03',
      '2020-04': '2020-04',
      '2020-05': '2020-05',
      '2020-06': '2020-06',
      '2020-01-week-0': '2020-01-week-0',
      '2020-02-week-0': '2020-02-week-0',
      '2020-03-week-0': '2020-03-week-0',
      '2020-04-week-0': '2020-04-week-0',
      '2020-05-week-0': '2020-05-week-0',
      '2020-06-week-0': '2020-06-week-0',
      '2020-01-week-1': '2020-01-week-1',
      '2020-02-week-1': '2020-02-week-1',
      '2020-03-week-1': '2020-03-week-1',
      '2020-04-week-1': '2020-04-week-1',
      '2020-05-week-1': '2020-05-week-1',
      '2020-06-week-1': '2020-06-week-1',
      '2020-01-week-2': '2020-01-week-2',
      '2020-02-week-2': '2020-02-week-2',
      '2020-03-week-2': '2020-03-week-2',
      '2020-04-week-2': '2020-04-week-2',
      '2020-05-week-2': '2020-05-week-2',
      '2020-06-week-2': '2020-06-week-2',
      '2020-01-week-3': '2020-01-week-3',
      '2020-02-week-3': '2020-02-week-3',
      '2020-03-week-3': '2020-03-week-3',
      '2020-04-week-3': '2020-04-week-3',
      '2020-05-week-3': '2020-05-week-3',
      '2020-06-week-3': '2020-06-week-3',
    },
    9: {
      '2020-01': '2020-01',
      '2020-02': '2020-02',
      '2020-03': '2020-03',
      '2020-04': '2020-04',
      '2020-05': '2020-05',
      '2020-06': '2020-06',
      '2020-01-week-0': '2020-01-week-0',
      '2020-02-week-0': '2020-02-week-0',
      '2020-03-week-0': '2020-03-week-0',
      '2020-04-week-0': '2020-04-week-0',
      '2020-05-week-0': '2020-05-week-0',
      '2020-06-week-0': '2020-06-week-0',
      '2020-01-week-1': '2020-01-week-1',
      '2020-02-week-1': '2020-02-week-1',
      '2020-03-week-1': '2020-03-week-1',
      '2020-04-week-1': '2020-04-week-1',
      '2020-05-week-1': '2020-05-week-1',
      '2020-06-week-1': '2020-06-week-1',
      '2020-01-week-2': '2020-01-week-2',
      '2020-02-week-2': '2020-02-week-2',
      '2020-03-week-2': '2020-03-week-2',
      '2020-04-week-2': '2020-04-week-2',
      '2020-05-week-2': '2020-05-week-2',
      '2020-06-week-2': '2020-06-week-2',
      '2020-01-week-3': '2020-01-week-3',
      '2020-02-week-3': '2020-02-week-3',
      '2020-03-week-3': '2020-03-week-3',
      '2020-04-week-3': '2020-04-week-3',
      '2020-05-week-3': '2020-05-week-3',
      '2020-06-week-3': '2020-06-week-3',
    },
    10: {
      '2020-01': '2020-01',
      '2020-02': '2020-02',
      '2020-03': '2020-03',
      '2020-04': '2020-04',
      '2020-05': '2020-05',
      '2020-06': '2020-06',
      '2020-01-week-0': '2020-01-week-0',
      '2020-02-week-0': '2020-02-week-0',
      '2020-03-week-0': '2020-03-week-0',
      '2020-04-week-0': '2020-04-week-0',
      '2020-05-week-0': '2020-05-week-0',
      '2020-06-week-0': '2020-06-week-0',
      '2020-01-week-1': '2020-01-week-1',
      '2020-02-week-1': '2020-02-week-1',
      '2020-03-week-1': '2020-03-week-1',
      '2020-04-week-1': '2020-04-week-1',
      '2020-05-week-1': '2020-05-week-1',
      '2020-06-week-1': '2020-06-week-1',
      '2020-01-week-2': '2020-01-week-2',
      '2020-02-week-2': '2020-02-week-2',
      '2020-03-week-2': '2020-03-week-2',
      '2020-04-week-2': '2020-04-week-2',
      '2020-05-week-2': '2020-05-week-2',
      '2020-06-week-2': '2020-06-week-2',
      '2020-01-week-3': '2020-01-week-3',
      '2020-02-week-3': '2020-02-week-3',
      '2020-03-week-3': '2020-03-week-3',
      '2020-04-week-3': '2020-04-week-3',
      '2020-05-week-3': '2020-05-week-3',
      '2020-06-week-3': '2020-06-week-3',
    },
    11: {
      '2020-01': '2020-01',
      '2020-02': '2020-02',
      '2020-03': '2020-03',
      '2020-04': '2020-04',
      '2020-05': '2020-05',
      '2020-06': '2020-06',
      '2020-01-week-0': '2020-01-week-0',
      '2020-02-week-0': '2020-02-week-0',
      '2020-03-week-0': '2020-03-week-0',
      '2020-04-week-0': '2020-04-week-0',
      '2020-05-week-0': '2020-05-week-0',
      '2020-06-week-0': '2020-06-week-0',
      '2020-01-week-1': '2020-01-week-1',
      '2020-02-week-1': '2020-02-week-1',
      '2020-03-week-1': '2020-03-week-1',
      '2020-04-week-1': '2020-04-week-1',
      '2020-05-week-1': '2020-05-week-1',
      '2020-06-week-1': '2020-06-week-1',
      '2020-01-week-2': '2020-01-week-2',
      '2020-02-week-2': '2020-02-week-2',
      '2020-03-week-2': '2020-03-week-2',
      '2020-04-week-2': '2020-04-week-2',
      '2020-05-week-2': '2020-05-week-2',
      '2020-06-week-2': '2020-06-week-2',
      '2020-01-week-3': '2020-01-week-3',
      '2020-02-week-3': '2020-02-week-3',
      '2020-03-week-3': '2020-03-week-3',
      '2020-04-week-3': '2020-04-week-3',
      '2020-05-week-3': '2020-05-week-3',
      '2020-06-week-3': '2020-06-week-3',
    },
  }
  return config[rowKey][key]
}

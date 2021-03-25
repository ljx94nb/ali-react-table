interface ResultItem {
  目标收入: number
  实际收入: number
  目标达成率: number
  收入月环比: number
}

interface Result {
  [key: string]: ResultItem
}

function getValue(str: string): ResultItem {
  if (str === '["forenoon","上半年"]') {
    return {
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    }
  }
  if (str === '["forenoon","下半年"]') {
    return {
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    }
  }
  if (str === '["afternoon","上半年"]') {
    return {
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    }
  }
  if (str === '["afternoon","下半年"]') {
    return {
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    }
  }
  if (str === '["evening","上半年"]') {
    return {
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    }
  }
  if (str === '["evening","下半年"]') {
    return {
      目标收入: 21,
      实际收入: 21,
      目标达成率: 21,
      收入月环比: 21,
    }
  }

  if (str === '["forenoon","forenoon-9","上半年"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["forenoon","forenoon-9","下半年"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["afternoon","afternoon-9","上半年"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["afternoon","afternoon-9","下半年"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["evening","evening-9","上半年"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["evening","evening-9","下半年"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["forenoon","forenoon-10","上半年"]') {
    return {
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    }
  }
  if (str === '["forenoon","forenoon-10","下半年"]') {
    return {
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    }
  }
  if (str === '["afternoon","afternoon-10","上半年"]') {
    return {
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    }
  }
  if (str === '["afternoon","afternoon-10","下半年"]') {
    return {
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    }
  }
  if (str === '["evening","evening-10","上半年"]') {
    return {
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    }
  }
  if (str === '["evening","evening-10","下半年"]') {
    return {
      目标收入: 7,
      实际收入: 7,
      目标达成率: 7,
      收入月环比: 7,
    }
  }

  if (str === '["forenoon","forenoon-11","上半年"]') {
    return {
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    }
  }
  if (str === '["forenoon","forenoon-11","下半年"]') {
    return {
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    }
  }
  if (str === '["afternoon","afternoon-11","上半年"]') {
    return {
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    }
  }
  if (str === '["afternoon","afternoon-11","下半年"]') {
    return {
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    }
  }
  if (str === '["evening","evening-11","上半年"]') {
    return {
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    }
  }
  if (str === '["evening","evening-11","下半年"]') {
    return {
      目标收入: 8,
      实际收入: 8,
      目标达成率: 8,
      收入月环比: 8,
    }
  }

  if (str === '["forenoon","上半年","2020-01"]') {
    return {
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    }
  }
  if (str === '["forenoon","上半年","2020-02"]') {
    return {
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    }
  }
  if (str === '["forenoon","上半年","2020-03"]') {
    return {
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    }
  }
  if (str === '["forenoon","上半年","2020-04"]') {
    return {
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    }
  }
  if (str === '["forenoon","上半年","2020-05"]') {
    return {
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    }
  }
  if (str === '["forenoon","上半年","2020-06"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["afternoon","上半年","2020-01"]') {
    return {
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    }
  }
  if (str === '["afternoon","上半年","2020-02"]') {
    return {
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    }
  }
  if (str === '["afternoon","上半年","2020-03"]') {
    return {
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    }
  }
  if (str === '["afternoon","上半年","2020-04"]') {
    return {
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    }
  }
  if (str === '["afternoon","上半年","2020-05"]') {
    return {
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    }
  }
  if (str === '["afternoon","上半年","2020-06"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["evening","上半年","2020-01"]') {
    return {
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    }
  }
  if (str === '["evening","上半年","2020-02"]') {
    return {
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    }
  }
  if (str === '["evening","上半年","2020-03"]') {
    return {
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    }
  }
  if (str === '["evening","上半年","2020-04"]') {
    return {
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    }
  }
  if (str === '["evening","上半年","2020-05"]') {
    return {
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    }
  }
  if (str === '["evening","上半年","2020-06"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["forenoon","下半年","2020-07"]') {
    return {
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    }
  }
  if (str === '["forenoon","下半年","2020-08"]') {
    return {
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    }
  }
  if (str === '["forenoon","下半年","2020-09"]') {
    return {
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    }
  }
  if (str === '["forenoon","下半年","2020-10"]') {
    return {
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    }
  }
  if (str === '["forenoon","下半年","2020-11"]') {
    return {
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    }
  }
  if (str === '["forenoon","下半年","2020-12"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["afternoon","下半年","2020-07"]') {
    return {
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    }
  }
  if (str === '["afternoon","下半年","2020-08"]') {
    return {
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    }
  }
  if (str === '["afternoon","下半年","2020-09"]') {
    return {
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    }
  }
  if (str === '["afternoon","下半年","2020-10"]') {
    return {
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    }
  }
  if (str === '["afternoon","下半年","2020-11"]') {
    return {
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    }
  }
  if (str === '["afternoon","下半年","2020-12"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
  if (str === '["evening","下半年","2020-07"]') {
    return {
      目标收入: 1,
      实际收入: 1,
      目标达成率: 1,
      收入月环比: 1,
    }
  }
  if (str === '["evening","下半年","2020-08"]') {
    return {
      目标收入: 2,
      实际收入: 2,
      目标达成率: 2,
      收入月环比: 2,
    }
  }
  if (str === '["evening","下半年","2020-09"]') {
    return {
      目标收入: 3,
      实际收入: 3,
      目标达成率: 3,
      收入月环比: 3,
    }
  }
  if (str === '["evening","下半年","2020-10"]') {
    return {
      目标收入: 4,
      实际收入: 4,
      目标达成率: 4,
      收入月环比: 4,
    }
  }
  if (str === '["evening","下半年","2020-11"]') {
    return {
      目标收入: 5,
      实际收入: 5,
      目标达成率: 5,
      收入月环比: 5,
    }
  }
  if (str === '["evening","下半年","2020-12"]') {
    return {
      目标收入: 6,
      实际收入: 6,
      目标达成率: 6,
      收入月环比: 6,
    }
  }
}

export const getValues = async (requestPathArr: string[][], targets: string[]): Promise<Result> => {
  console.log(requestPathArr)
  const map: Result = {}
  requestPathArr.forEach((item: string[]) => {
    const str = JSON.stringify(item)
    map[str] = getValue(str)
  })
  return map
}

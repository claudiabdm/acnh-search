import moment from 'moment';

export default function(monthsNum: number[] | number): string {
  let monthsStr: string | string[] = '';

  if (typeof monthsNum === 'number') {
    return moment()
      .month(monthsNum)
      .format('MMMM');
  }

  if (monthsNum.length < 2) {
    monthsStr = moment()
      .month(monthsNum[0])
      .format('MMMM');
  } else {
    const firstMonths = monthsNum.map(num =>
      moment()
        .month(num)
        .format('MMMM'),
    );
    const lastMonth = firstMonths.splice(-1, 1);
    monthsStr = `${firstMonths.join(', ')} and ${lastMonth}`;
  }
  return monthsStr;
}

/** @description 특정 Number를 3자리마다 콤마를 찍어줍니다. */
const setCommaForNumber = (value: number) => {
  const strValue = String(value);
  const regExp = /(\d)(?=(\d\d\d)+(?!\d))/g;

  return strValue.replace(regExp, "$1,");
};

/** @description 특정 number를 unit으로 나눕니다. */
const cuttingNumber = ({
  value,
  unit = 10000,
}: {
  value: number;
  unit?: number;
}) => value / unit;

const EMPTY_FORMAT = {
  zero: 0,
  dash: "-",
} as const;

export const ceilNumber = (value: number, unit: number) =>
  Math.ceil(value / (unit * 10)) * (unit * 10);
export const floorNumber = (value: number, unit: number) =>
  Math.floor(value / (unit * 10)) * (unit * 10);
export const roundNumber = (value: number, unit: number) =>
  Math.round(value / (unit * 10)) * (unit * 10);

const FORMAT_ACTION = {
  ceil: Math.ceil,
  floor: Math.floor,
  round: Math.round,
};

export interface FormatNumberToKRWProps {
  value: number;
  dividePriceLine: number;
  emptyFormat?: keyof typeof EMPTY_FORMAT;
  options?: {
    action?: "ceil" | "floor" | "round";
    actionTargetLine?: number;
  };
}

/**
 * @description
 * 기본적으로 각 금액은 천원 아래는 절삭되어 내려옵니다.
 *
 * 기본 요구사항
 * 1. 0원일때 어떻게 보여줄지
 * 2. n원단위에서 올림, 반올림, 내림 처리할지
 * 3. m원을 기준으로 이상은 -만원, 아래는 -원으로 표기
 *
 *
 * parameter
 * 1. 0일때 노출할 방식 ( zero | dash ) - emptyFormat
 * 2-1. 특정 금액선 - dividePriceLine
 * 2-2. 2-1 금액선에서 올림처리할지 내림처리할지 반올림할지 (ceil, floor, round)  - options
 * 3. (콤마 달고) 원 / 만원 표기를 위한 특정 금액선 (숫자 제거지점)
 * -> ex) 만원 이하 절삭 = 천원까지 제거 = dividePriceLine: 1000
 *
 *
 * ex) 1000원단위에서 올림, 내림, 반올림
 *
 * Math.ceil(12345 / 1000 * 10) -> 1.2345가 올림처리 -> 2*10000 = 20000
 * Math.round(16345 / 1000 * 10) -> 1.6345가 반올림처리 -> 2*10000 = 20000
 *
 * -> 받아온 actionTargetLine에서 10을 곱해주어야 해당 자리에서 작업이 진행되어 내부적으로 10을 곱해줍니다.
 */
export const formatNumberToKRW = ({
  value,
  emptyFormat = "dash",
  dividePriceLine,
  options: { action = "ceil", actionTargetLine = 1000 } = {},
}: FormatNumberToKRWProps) => {
  if (!value) return `${EMPTY_FORMAT[emptyFormat]}원`;

  const formattedNumber =
    FORMAT_ACTION[action](value / (actionTargetLine * 10)) *
    (actionTargetLine * 10);

  return value > dividePriceLine
    ? `${setCommaForNumber(cuttingNumber(formattedNumber))}만원`
    : `${setCommaForNumber(formattedNumber)}원`;
};

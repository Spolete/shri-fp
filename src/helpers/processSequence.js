import Api from '../tools/api';
import {
  tap,
  test,
  concat,
  otherwise,
  __,
  allPass,
  assoc,
  compose,
  partial,
  gt,
  andThen,
  ifElse,
  length,
  mathMod,
  lt,
  prop
} from "ramda";

const apiInstance = new Api();
const API_NUMBERS_URL = 'https://api.tech/numbers/base';
const API_ANIMALS_URL = 'https://animals.tech/';

const calculateSquare = num => num ** 2;
const isGreaterThanTwo = gt(__, 2);
const isLessThanTen = lt(__, 10);

const thenCalculateSquare = andThen(calculateSquare);

const isLengthGreaterThanTwo = compose(isGreaterThanTwo, length);
const isLengthLessThanTen = compose(isLessThanTen, length);
const containsOnlyNumbers = test(/^[0-9]+\.?[0-9]+$/);
const roundStringToInteger = compose(Math.round, Number);
const calculateModuloThreeAndConvertToString = compose(String, mathMod(__, 3));

const thenCalculateModuloThreeAndConvertToString = andThen(calculateModuloThreeAndConvertToString);
const thenCalculateLength = andThen(length);

const isValid = allPass([isLengthGreaterThanTwo, isLengthLessThanTen, containsOnlyNumbers]);

const extractResultFromApiResponse = compose(String, prop('result'));

const preparePayloadForNumberToBinaryConversion = assoc('number', __, { from: 10, to: 2 });

const fetchNumberBinaryBaseFromApi = compose(
  apiInstance.get(API_NUMBERS_URL),
  preparePayloadForNumberToBinaryConversion
);

const thenExtractResultFromApiResponse = andThen(extractResultFromApiResponse);
const thenConcatWithAnimalsApiUrl = andThen(concat(API_ANIMALS_URL));
const thenFetchDataFromApiWithEmptyParams = andThen(apiInstance.get(__, {}));

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
  const logToConsole = tap(writeLog);
  const thenLogToConsole = andThen(logToConsole);
  const thenExecuteSuccessCallback = andThen(handleSuccess);
  const otherwiseExecuteErrorCallback = otherwise(handleError);

  const executeValidationErrorCallback = partial(handleError, ['ValidationError']);

  const processSequence = compose(
    otherwiseExecuteErrorCallback,
    thenExecuteSuccessCallback,
    thenExtractResultFromApiResponse,
    thenFetchDataFromApiWithEmptyParams,
    thenConcatWithAnimalsApiUrl,
    thenLogToConsole,
    thenCalculateModuloThreeAndConvertToString,
    thenLogToConsole,
    thenCalculateSquare,
    thenLogToConsole,
    thenCalculateLength,
    thenLogToConsole,
    thenExtractResultFromApiResponse,
    fetchNumberBinaryBaseFromApi,
    logToConsole,
    roundStringToInteger,
  );

  const runSequenceConditionally = ifElse(isValid, processSequence, executeValidationErrorCallback);
  const logAndExecuteSequence = compose(runSequenceConditionally, logToConsole);

  logAndExecuteSequence(value);
};

export default processSequence;

import {
    compose,
    allPass,
    complement,
    any,
    propEq,
    equals,
    countBy,
    __,
    identity,
    dissoc,
    values,
    gte,
    prop
} from 'ramda';

const RED = 'red';
const WHITE = 'white';
const GREEN = 'green';
const ORANGE = 'orange';
const BLUE = 'blue';

const STAR = 'star';
const TRIANGLE = 'triangle';
const SQUARE = 'square';
const CIRCLE = 'circle';

const isTwoOrMore = gte(__, 2);
const isThreeOrMore = gte(__, 3);
const anyThreeOrMore = any(isThreeOrMore);
const anyValueThreeOrMore = compose(anyThreeOrMore, values);

const extractStar = prop(STAR);
const extractTriangle = prop(TRIANGLE);
const extractSquare = prop(SQUARE);
const extractCircle = prop(CIRCLE);

const isRed = equals(RED);
const isWhite = equals(WHITE);
const isGreen = equals(GREEN);
const isOrange = equals(ORANGE);
const isBlue = equals(BLUE);
const removeWhite = dissoc(WHITE);
const extractGreen = prop(GREEN);
const twoGreenInstances = propEq(GREEN, 2);
const oneRedInstance = propEq(RED, 1);

const countColors = compose(countBy(identity), values);
const countColorsWithoutWhite = compose(removeWhite, countColors);

const isStarRed = compose(isRed, extractStar);
const isStarWhite = compose(isWhite, extractStar);
const isStarNotRed = complement(isStarRed);
const isStarNotWhite = complement(isStarWhite);

const isCircleWhite = compose(isWhite, extractCircle);
const isCircleBlue = compose(isBlue, extractCircle);

const isTriangleWhite = compose(isWhite, extractTriangle);
const isTriangleGreen = compose(isGreen, extractTriangle);
const isTriangleNotWhite = complement(isTriangleWhite);

const isSquareGreen = compose(isGreen, extractSquare);
const isSquareOrange = compose(isOrange, extractSquare);
const isSquareWhite = compose(isWhite, extractSquare);
const isSquareNotWhite = complement(isSquareWhite);

const redEqualsBlue = ({ blue, red }) => blue === red;
const squareEqualsTriangle = ({ square, triangle }) => square === triangle;

const hasTwoGreenColors = compose(twoGreenInstances, countColors);
const hasOneRedColor = compose(oneRedInstance, countColors);

const allColorsAre = color => compose(propEq(color, 4), countColors);

const countGreenColors = compose(extractGreen, countColors);

export const validateFieldN1 = allPass([isStarRed, isSquareGreen, isTriangleWhite, isCircleWhite]);
export const validateFieldN2 = compose(isTwoOrMore, countGreenColors);
export const validateFieldN3 = compose(redEqualsBlue, countColors);
export const validateFieldN4 = allPass([isStarRed, isCircleBlue, isSquareOrange]);
export const validateFieldN5 = compose(anyValueThreeOrMore, countColorsWithoutWhite);
export const validateFieldN6 = allPass([isTriangleGreen, hasTwoGreenColors, hasOneRedColor]);
export const validateFieldN7 = allColorsAre(ORANGE);
export const validateFieldN8 = allPass([isStarNotRed, isStarNotWhite]);
export const validateFieldN9 = allColorsAre(GREEN);
export const validateFieldN10 = allPass([isSquareNotWhite, isTriangleNotWhite, squareEqualsTriangle]);

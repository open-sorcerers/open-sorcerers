/*
 * @repast addQuestionMark :: String -> String
 */
const addQuestionMark = x => x + "?";

/*
 * @repast notValid :: String -> Number
 */
const notValid = x => x + "?";

/*
 * @repast union :: String|Number -> String|Number -> String|Number
 */
const union = x => y => x + y;

/*
 * @repast fromA :: String -> {a:String}
 */
const fromA = a => ({ a });

/*
 * @repast fromB :: String -> {some:{depth:{contains:{b:String}}}}
 */
const fromB = b => ({ some: { depth: { contains: { b } } } });

/*
 * @repast fromDepth :: {some:{depth:{contains:{value:String}}}} -> String
 */
const fromDepth = o => o.some.depth.contains.value;

/*
 * @repast getName :: Object -> String
 */
const getName = u => u.personalData.name;

/*
 * @repast getMajor :: Object -> Boolean
 */
const getMajor = u => u.personalData.major;

/*
 * @repast toObj :: String -> Object
 */
const toObj = x => ({ x });

/*
 * @repast ofNumber :: Number -> Object
 */
const ofNumber = x => ({ x });

/*
 * @repast add :: Number -> Number -> Number
 */
const add = (x, y) => x + y;

/*
 * @repast swallow :: Object -> Void
 */
const swallow = x => {};

/*
 * @repast fourtyTwo :: Void -> Number
 */
const fourtyTwo = () => 42;

/*
 * @repast box :: Number -> [Number]
 */
const box = x => [x];

/*
 * @repast head :: [String] -> String
 */
const head = x => x[0];

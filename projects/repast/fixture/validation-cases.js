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

module Main where

import Debug.Trace
import Lexer
import Grammar

main :: IO ()
main = interact compile

-- TBD
compile :: String -> String
compile x = case scanTokens x of
    Left a -> "\nBAD: " ++ a ++ "\n"
    Right b -> "\nGOOD: " ++ (show $ parseExpressions(b)) ++ "\n"

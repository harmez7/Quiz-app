import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchSession = (url) => axios(`https://opentdb.com/api.php?${url}`)

const useQuizData = (url, isURLValid) => {
  // console.log(isURLValid)
  // const defaultURL = "amount=5&category=0&difficulty=easy&type=boolean"
  return useQuery({
    queryKey: ["quiz-session-data"],
    // queryFn: () => fetchSession(isDefault ? defaultURL : url),
    queryFn: () => fetchSession(url),
    // enabled: isDefault ? true : isURLValid,
    enabled: isURLValid,
    refetchOnWindowFocus: false,
  })
}

export default useQuizData

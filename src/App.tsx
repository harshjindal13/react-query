import { useQuery, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import './App.css'
import createTodoQueryOptions from "./queryOptions/createTodoQueryOptions";

function App() {

  // here data_type data: Todo[] | undefined
  // const { data, isPending } = useQuery(createTodoQueryOptions()); 

  // here data_type data: Todo[]; useSuspenseQuery ensures the data can't be undefined
  const { data, isPending } = useSuspenseQuery(createTodoQueryOptions()); 


  return (
    <>
      <div>{isPending ? "Loading..." : JSON.stringify(data?.slice(0, 10))}</div>
    </>
  )
}

export default App

import { queryOptions } from "@tanstack/react-query";
import api from "../lib/axios.ts";
const createTodoQueryOptions = () => {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
}

const getTodos = async (): Promise<Todo[]> => {   
  // working with asyn so it always a promose that will be returning, and Todo has [] because it has a array to data.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await api.get(`/comments?postId=${1}`);
  return response.data;
}

type Todo = {
  userId: number;
  id: number;
  titel: string;
  completed: boolean;
}

export default createTodoQueryOptions;
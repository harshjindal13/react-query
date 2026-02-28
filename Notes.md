| Feature            | What it Does                       |
| ------------------ | ---------------------------------- |
| Loading State      | Gives `isPending` / `isLoading`    |
| Error Handling     | Gives `isError`, `error`           |
| Success State      | Gives `isSuccess`                  |
| Retry Logic        | Automatically retry failed request |
| Cache Invalidation | Refetch updated queries            |

## Example

```JavaScript

const deleteUser = async (id) => {
  await axios.delete(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
};

const DeleteUser = ({ id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <button onClick={() => mutation.mutate(id)}>
      {mutation.isLoading ? "Deleting..." : "Delete"}
    </button>
  );
};
```

---

## Difference Between useQuery & useMutation

| useQuery           | useMutation              |
| ------------------ | ------------------------ |
| Used for GET       | Used for POST/PUT/DELETE |
| Runs automatically | Runs manually            |
| Caches data        | Changes data             |
| Used for fetching  | Used for modifying       |

---

## Use useMutation when:

- Submitting a form

- Updating user profile

- Deleting records

- Uploading files

- Logging in

Basically → Any server-side data change

## Summary (Interview Ready)

- useMutation is used to modify server data.

- It does not run automatically — you call mutate().

- It handles loading, error, and success states.

- It supports cache invalidation and optimistic updates.

- Works perfectly with Axios for API requests.

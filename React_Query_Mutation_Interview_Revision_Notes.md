# React Query (TanStack Query) - Mutation

## Interview-Focused Short Revision Notes

------------------------------------------------------------------------

## 1️⃣ What is useMutation?

-   Used to **modify server data**
-   Handles **POST, PUT, PATCH, DELETE**
-   Does NOT run automatically
-   Triggered using `mutate()`

**One-liner:** \> useMutation is used to perform server-side data
updates and manage loading, error, and success states automatically.

------------------------------------------------------------------------

## 2️⃣ useQuery vs useMutation

  useQuery                    useMutation
  --------------------------- --------------------------
  Used for GET                Used for POST/PUT/DELETE
  Runs automatically          Runs manually
  Caches data                 Modifies data
  Refetches on invalidation   Triggers side effects

------------------------------------------------------------------------

## 3️⃣ Basic Syntax

``` js
const mutation = useMutation({
  mutationFn: apiFunction,
  onSuccess: () => {},
  onError: () => {},
});

mutation.mutate(data);
```

------------------------------------------------------------------------

## 4️⃣ Important Mutation States

-   `isLoading`
-   `isError`
-   `isSuccess`
-   `error`
-   `data`

Example:

``` js
<button disabled={mutation.isLoading}>
  {mutation.isLoading ? "Saving..." : "Save"}
</button>
```

------------------------------------------------------------------------

## 5️⃣ Cache Handling After Mutation

### Option 1: Invalidate Queries (Simple)

``` js
onSuccess: () => {
  queryClient.invalidateQueries(["users"]);
}
```

✔ Easy\
✔ Always correct\
❌ Extra network request

------------------------------------------------------------------------

### Option 2: Update Cache Manually (Optimized)

``` js
onSuccess: (newUser) => {
  queryClient.setQueryData(["users"], (old) => [...old, newUser]);
}
```

✔ Instant UI update\
✔ No refetch\
✔ Better performance

------------------------------------------------------------------------

## 6️⃣ Optimistic Updates (Advanced)

``` js
onMutate: async (newUser) => {
  await queryClient.cancelQueries(["users"]);

  const previousUsers = queryClient.getQueryData(["users"]);

  queryClient.setQueryData(["users"], (old) => [...old, newUser]);

  return { previousUsers };
},

onError: (err, newUser, context) => {
  queryClient.setQueryData(["users"], context.previousUsers);
},
```

✔ UI updates before server responds\
✔ Rolls back on error

------------------------------------------------------------------------

## 7️⃣ Best Practices

✔ Separate API logic from components\
✔ Use custom hooks for mutations\
✔ Use PATCH for partial updates\
✔ Prefer invalidateQueries for simplicity\
✔ Prefer setQueryData for performance

------------------------------------------------------------------------

## 8️⃣ Common Interview Questions

### Why use useMutation instead of axios directly?

-   Manages async state automatically
-   Syncs cache with server
-   Reduces boilerplate

### Do mutations cache data?

No. Only queries cache data.

### What happens if you don't invalidate?

UI may show stale data.

------------------------------------------------------------------------

## 9️⃣ 30-Second Interview Summary

"React Query's useMutation is used for modifying server data like POST,
PUT, PATCH, and DELETE requests. It runs manually using mutate(). After
success, we either invalidate queries to refetch fresh data or manually
update the cache using setQueryData to keep UI consistent with the
server. It simplifies async state management and reduces boilerplate
compared to using axios alone."

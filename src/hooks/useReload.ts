export function useReload() {

  const reload = async (refetch?: () => void, timer: number = 0) => {
    if (refetch) {
      await refetch()
    }

    await new Promise(resolve => setTimeout(resolve, timer))
    location.reload()
  };


  return { reload };
}
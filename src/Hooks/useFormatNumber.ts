import { useCallback } from 'react'

const useFormatNumber = () => {
  const NOT_AVAILABLE = 'N/A'

  const formatNumberOrNA = useCallback(
    (
      value: string | number | null | undefined,
      decimals: number = 2
    ): string => {
      if (value === null || value === undefined || value === '') {
        return NOT_AVAILABLE
      }

      const num = parseFloat(value.toString())
      return isNaN(num) ? NOT_AVAILABLE : num.toFixed(decimals)
    },
    []
  )

  return { formatNumberOrNA, NOT_AVAILABLE }
}

export default useFormatNumber

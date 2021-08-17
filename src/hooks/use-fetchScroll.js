import { useCallback } from 'react'
import useHttp from './use-http'

export default function useFetchScroll() {
    const { isLoading, error, sendRequest } = useHttp()

    const fetchScroll = useCallback((pageNextList, getList) => {
        if (pageNextList !== null) {
            sendRequest({ url: pageNextList }, getList)
        } else {
            return
        }
    }, [sendRequest])

    return {
        isLoading,
        error,
        fetchScroll
    }
}

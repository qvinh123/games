import { useCallback, useState } from 'react'

export default function useFetchList() {
    const [list, setList] = useState([]);
    const [pageNextList, setPageNextList] = useState(null)

    const getListPage = useCallback((data) => {
        setPageNextList(data.next)
        setList((prevList) => prevList.concat(data.results))
    }, [list])

    const getList = useCallback((data) => {
        setList(data.results)
    }, [])

    const emptyArr = useCallback(() => {
        setList([])
    }, [])

    return {
        list,
        pageNextList,
        getListPage,
        getList,
        emptyArr
    }
}

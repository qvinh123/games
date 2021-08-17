import { useCallback, useState } from 'react'

export default function useEEnterLeave() {
    const [nameHover, setNameHover] = useState(null)
    const [isOnMouse, setIsOnMouse] = useState(false)

    const onMouseLeaveHandler = useCallback(() => {
        setIsOnMouse(false)
        setNameHover(null)
    }, [])

    const onMouseEnterHandler = useCallback((nameHover) => {
        setNameHover(nameHover)
    }, [])

    const isMouseEnterHandler = useCallback(() => {
        setIsOnMouse(true)
    },[])

    return {
        nameHover,
        isOnMouse,
        onMouseLeaveHandler,
        onMouseEnterHandler,
        isMouseEnterHandler
    }
}


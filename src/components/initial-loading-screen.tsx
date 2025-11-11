import React, { useEffect, useState } from 'react'
import LoadingComponent from './loading-component';
import { AnimatePresence } from 'framer-motion';

const InitialLoadingScreen = () => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && <LoadingComponent />}
        </AnimatePresence>
    )
}

export default InitialLoadingScreen;
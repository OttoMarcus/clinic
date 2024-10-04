import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

function useScroll(timeout = 100) {
    const [scrollPosition, setScrollPosition] = useState(0);

    // Використовуємо useCallback для мемоізації handleScroll
    const handleScroll = useCallback(
        debounce(() => {
            setScrollPosition(window.scrollY);
        }, timeout),
        [timeout] // Залежить від timeout
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll.cancel(); // Забезпечуємо, що дебаунсований виклик очищається
        };
    }, [handleScroll]);

    return scrollPosition;
}

export default useScroll;

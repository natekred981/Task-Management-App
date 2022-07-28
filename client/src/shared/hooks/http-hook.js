import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrlr = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrlr);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrlr.signal //cancels an active request
            });
            const responseData  = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrlr
            );

            setIsLoading(false);
            if (!response.ok){
                throw new Error(responseData.message);
              }
              return responseData;
        }
        catch (err) {
            setIsLoading(false);
            setError(err.message);
            console.log(err);
            throw err;
        }

        
        
        
    }, []) ;

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abortCtrl())
        };
    }, []);

    return { isLoading, error, sendRequest, clearError};
    
};
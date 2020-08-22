import {useEffect, useState} from 'react'
import axios from 'axios'

const useDataApi = (initialUrl) => {
    const [url, setUrl] = useState(initialUrl);
    const [refreshKey, setrefreshKey] = useState(0)
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          setIsError(false);
          setIsLoading(true);
          try {
              const result = await axios.get(url);
              setData(result.data);
          } catch (error) {
                setIsError(true);
          }
          setIsLoading(false);
        };
        fetchData();
    }, [url, refreshKey])

    return [{data, isLoading, isError}, setUrl, setrefreshKey];
}

export default useDataApi

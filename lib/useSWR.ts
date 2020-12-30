import { useEffect, useRef } from 'react';
import _useSWR from 'swr';
import { ConfigInterface, keyInterface, fetcherFn, responseInterface } from 'swr/dist/types';

/**
 * Patched version of SWR to work around bug where a key change is not detected when using initial data
 * @see https://github.com/vercel/swr/issues/284
 */
const useSWR = <Data, Error>(
  key: keyInterface,
  fn?: fetcherFn<Data>,
  config?: ConfigInterface<Data, Error>
): responseInterface<Data, Error> => {
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  return _useSWR<Data, Error>(key, fn, {
    ...config,
    initialData: hasMounted.current ? undefined : config?.initialData,
  });
};

export default useSWR;
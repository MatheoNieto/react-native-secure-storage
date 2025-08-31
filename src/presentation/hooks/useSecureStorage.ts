import {createSecureStorageUC} from '@application/useCases';
import React from 'react';
import {SecureStorageRepositoryImpl} from '@infrastructure/repositories/secureStorageRepository';

export const useSecureStorage = (keyName: string) => {
  const repo = new SecureStorageRepositoryImpl();
  const createUC = createSecureStorageUC(repo);

  const [value, setValue] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const storedValue = await createUC.getItem(keyName);
      console.log('===>LOADING DATA MOUNTED===>', storedValue);
      setValue(storedValue);
      setLoading(false);
    })();
  }, [keyName]);

  const updateValue = React.useCallback(
    (newValue: string) => {
      createUC.setItem(keyName, newValue);
      setValue(newValue);
    },
    [value, keyName],
  );

  const refreshValue = React.useCallback(async () => {
    const newValue = await createUC.getItem(keyName);
    console.log('REFRESH VALUE', newValue);
    setValue(newValue);
  }, [keyName]);

  return {
    value,
    updateValue,
    refreshValue,
    loading,
  };
};

import {createStorageUC} from '@application/useCases';
import React from 'react';
import {SecureStorageRepositoryImpl} from '@infrastructure/storageRepository';

export const useStorage = (keyName: string) => {
  const repo = new SecureStorageRepositoryImpl();
  const createUC = createStorageUC(repo);

  const [value, setValue] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;

    (async () => {
      setLoading(true);
      const storedValue = await createUC.getItem.execute(keyName);
      if (isMounted) {
        setValue(storedValue);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [keyName]);

  const updateValue = React.useCallback(
    (newValue: string) => {
      createUC.setItem.execute(keyName, newValue);
      setValue(newValue);
    },
    [value, keyName],
  );

  const deleteItem = React.useCallback(() => {
    createUC.removeItem.execute(keyName);
    setValue(null);
  }, [keyName]);

  return {
    value,
    updateValue,
    deleteItem,
    loading,
  };
};

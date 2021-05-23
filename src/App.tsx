import React, { useState, useEffect, useCallback } from 'react';

import { debounce } from 'ts-debounce';

import classNames from 'classnames';
import { getResultValue, getPayMethods } from './Api/PayMethod';
import { ResultPaymethods, PayMethod, Amount } from './interfaces';
import { SuccessPage } from './Components/SuccessPage/SuccessPage';
import { ConfirmationPage } from './Components/СonfirmationPage/ConfirmationPage';
import { ExchangeForm } from './Components/ExchangeForm/ExchangeForm';

const App: React.FC = () => {
  const [invoicePayMethodId, setInvoicePayMethodId] = useState<number>(0);
  const [withdrawPayMethodId, setWithdrawPayMethodId] = useState<number>(0);
  const [withdrawValue, setWithdrawValue] = useState('');
  const [invoiceValue, setInvoiceValue] = useState('');
  const [payMethod, setPayMethod] = useState<string>('');
  const [invoicePayMethod, setInvocePayMethod] = useState<PayMethod[]>([]);
  const [withdrawPayMethod, setWithdrawPayMethod] = useState<PayMethod[]>([]);
  const [page, setPage] = useState('form');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPayMethods().then((result: ResultPaymethods) => {
      setInvocePayMethod(result.invoice);
      setInvoicePayMethodId(result.invoice[0].id);
      setWithdrawPayMethod(result.withdraw);
      setWithdrawPayMethodId(result.withdraw[0].id);
      setIsLoading(false);
    });
  }, []);

  const query = useCallback(debounce((
    value: string,
    invoiceId: number,
    method: string,
    withdrawId: number,
  ) => {
    if (!value) {
      if (method === 'invoice') setWithdrawValue('');
      if (method === 'withdraw') setInvoiceValue('');

      return null;
    }
    setIsLoading(true);
    return getResultValue(invoiceId, method, withdrawId, value).then((result: Amount) => {
      if (method === 'invoice') {
        setWithdrawValue(String(result.amount));
        setPayMethod('invoice');
        setIsLoading(false);
      }

      if (method === 'withdraw') {
        setInvoiceValue(String(result.amount));
        setPayMethod('withdraw');
        setIsLoading(false);
      }
    });
  }, 500), []);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'invoice') setInvoiceValue(value);
    if (name === 'withdraw') setWithdrawValue(value);

    query(value, invoicePayMethodId, name, withdrawPayMethodId);
  };

  const reset = useCallback(() => {
    setInvoiceValue('');
    setWithdrawValue('');
    setInvoicePayMethodId(invoicePayMethod[0].id);
    setWithdrawPayMethodId(withdrawPayMethod[0].id);
    setPage('form');
  }, [invoicePayMethodId, withdrawPayMethodId]);

  return (
    <div className={classNames('app', {
      'app-loading': isLoading,
    })}
    >
      {page === 'form' && (
        <ExchangeForm
          invoicePayMethod={invoicePayMethod}
          withdrawPayMethod={withdrawPayMethod}
          setPage={setPage}
          setInvoicePayMethodId={setInvoicePayMethodId}
          handleChangeValue={handleChangeValue}
          setWithdrawPayMethodId={setWithdrawPayMethodId}
          withdrawValue={withdrawValue}
          invoiceValue={invoiceValue}
          isLoading={isLoading}
        />
      )}
      {page === 'conferm' && (
        <ConfirmationPage
          withdrawValue={withdrawValue}
          payMethod={payMethod}
          invoiceValue={invoiceValue}
          invoicePayMethod={invoicePayMethod}
          withdrawPayMethod={withdrawPayMethod}
          invoicePayMethodId={invoicePayMethodId}
          withdrawPayMethodId={withdrawPayMethodId}
          setPage={setPage}
          reset={reset}
        />
      )}
      {page === 'success' && (
        <SuccessPage
          reset={reset}
        />
      )}
    </div>
  );
};

export default App;

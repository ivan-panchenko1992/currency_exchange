// eslint-disable-next-line import/no-unresolved
import React, { useState, useEffect } from 'react';
import './App.scss';
// import { debounce } from 'ts-debounce';

import classNames from 'classnames';
import { getResultValue, getPayMethods } from './Api/PayMethod';
import { Amount, ResultPaymethods, PayMethod } from './interfaces';
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

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'invoice') {
      setInvoiceValue(value);
      if (value) {
        getResultValue(invoicePayMethodId, 'invoice', withdrawPayMethodId, value)
          .then((result: Amount) => {
            setWithdrawValue(String(result.amount));
            setPayMethod('invoice');
          });
      } else {
        setWithdrawValue('');
      }
      return;
    }

    if (name === 'withdraw') {
      setWithdrawValue(value);
      if (value) {
        getResultValue(invoicePayMethodId, 'withdraw', withdrawPayMethodId, value)
          .then((result: Amount) => {
            setInvoiceValue(String(result.amount));
            setPayMethod('withdraw');
          });
      } else {
        setInvoiceValue('');
      }
    }
  };

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
        />
      )}
      {page === 'success' && (
        <SuccessPage
          setPage={setPage}
          setInvoiceValue={setInvoiceValue}
          setWithdrawValue={setWithdrawValue}
        />
      )}
    </div>
  );
};

export default App;

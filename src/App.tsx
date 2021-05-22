// eslint-disable-next-line import/no-unresolved
import React, { useState, useEffect } from 'react';
import './App.scss';
import { getValueInvoise, getPayMethods } from './Api/PayMethod';
import { Amount, ResultPaymethods, PayMethod } from './interfaces';
import { SuccessPage } from './Components/SuccessPage/SuccessPage';
import { ConfirmationPage } from './Components/СonfirmationPage/ConfirmationPage';
import { ExchangeForm } from './Components/ExchangeForm/ExchangeForm';

const App: React.FC = () => {
  const [invoicePayMethodId, setInvoicePayMethodId] = useState<number>(0);
  const [withdrawPayMethodId, setWithdrawPayMethodId] = useState<number>(0);
  const [withdrawValue, setWithdrawValue] = useState('');
  const [invoiseValue, setInvoiseValue] = useState('');
  const [payMethod, setPayMethod] = useState<string>('');
  const [invoisePayMethod, setInvosePayMethod] = useState<PayMethod[]>([]);
  const [withdrawPayMethod, setWithdrawPayMethod] = useState<PayMethod[]>([]);
  const [page, setPage] = useState('form');

  useEffect(() => {
    getPayMethods().then((result: ResultPaymethods) => {
      setInvosePayMethod(result.invoice);
      setInvoicePayMethodId(result.invoice[0].id);
      setWithdrawPayMethod(result.withdraw);
      setWithdrawPayMethodId(result.withdraw[0].id);
    });
  }, []);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'invoice') {
      setInvoiseValue(value);
      if (value) {
        getValueInvoise(invoicePayMethodId, 'invoice', withdrawPayMethodId, value)
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
        getValueInvoise(invoicePayMethodId, 'withdraw', withdrawPayMethodId, value)
          .then((result: Amount) => {
            setInvoiseValue(String(result.amount));
            setPayMethod('withdraw');
          });
      } else {
        setInvoiseValue('');
      }
    }
  };

  return (
    <div className="app">
      {page === 'form' && (
        <ExchangeForm
          invoisePayMethod={invoisePayMethod}
          withdrawPayMethod={withdrawPayMethod}
          setPage={setPage}
          setInvoicePayMethodId={setInvoicePayMethodId}
          handleChangeValue={handleChangeValue}
          setWithdrawPayMethodId={setWithdrawPayMethodId}
          withdrawValue={withdrawValue}
          invoiseValue={invoiseValue}
        />
      )}
      {page === 'conferm' && (
        <ConfirmationPage
          withdrawValue={withdrawValue}
          payMethod={payMethod}
          invoiseValue={invoiseValue}
          invoisePayMethod={invoisePayMethod}
          withdrawPayMethod={withdrawPayMethod}
          invoicePayMethodId={invoicePayMethodId}
          withdrawPayMethodId={withdrawPayMethodId}
          setPage={setPage}
        />
      )}
      {page === 'success' && (
        <SuccessPage
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default App;

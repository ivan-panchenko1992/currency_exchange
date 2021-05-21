// eslint-disable-next-line import/no-unresolved
import React, { useState, useEffect } from 'react';
import './App.css';

import { Route } from 'react-router-dom';
import { getValueInvoise, getPayMethods } from './Api/PayMethod';
import { Amount, ResultPaymethods, PayMethod } from './interfaces';
import { SuccessPage } from './Components/SuccessPage/SuccessPage';
import { ConfirmationPage } from './Components/СonfirmationPage/ConfirmationPage';
import { ExchangeForm } from './Components/ExchangeForm/ExchangeForm';

const App: React.FC = () => {
  const [invoicePayMethodId, setInvoicePayMethodId] = useState<number>(0);
  const [withdrawPayMethodId, setWithdrawPayMethodId] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState('');
  const [invoiseValue, setInvoiseValue] = useState('');
  const [payMethod, setPaymethod] = useState<string>('');
  const [invoisePayMethod, setInvosePayMethod] = useState<PayMethod[]>([]);
  const [withdrawPayMethod, setWithdrawPayMethod] = useState<PayMethod[]>([]);
  const [isVisibleCoferm, setIsVisibleCoferm] = useState(false);

  useEffect(() => {
    getPayMethods().then((result: ResultPaymethods) => {
      setInvosePayMethod(result.invoice);
      setWithdrawPayMethod(result.withdraw);
    });
  }, []);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'invoice') {
      setInvoiseValue(value);
      if (value) {
        getValueInvoise(invoicePayMethodId, 'invoice', withdrawPayMethodId, +value)
          .then((result: Amount) => {
            setWithdrawValue(String(result.amount));
            setPaymethod('invoise');
          });
      } else {
        setWithdrawValue('');
      }
      return;
    }

    if (name === 'withdraw') {
      setWithdrawValue(value);
      if (value) {
        getValueInvoise(invoicePayMethodId, 'withdraw', withdrawPayMethodId, +value)
          .then((result: Amount) => {
            setInvoiseValue(String(result.amount));
            setPaymethod('withdraw');
          });
      } else {
        setInvoiseValue('');
      }
    }
  };

  // const exchange = (event: React.FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   setIsVisibleCoferm(true);
  // };
  console.log(isVisibleCoferm);

  return (
    <div className="app">
      {!isVisibleCoferm && (
        <ExchangeForm
          invoisePayMethod={invoisePayMethod}
          withdrawPayMethod={withdrawPayMethod}
          // onExchange={exchange}
          setIsVisibleCoferm={setIsVisibleCoferm}
          setInvoicePayMethodId={setInvoicePayMethodId}
          handleChangeValue={handleChangeValue}
          setWithdrawPayMethodId={setWithdrawPayMethodId}
          withdrawValue={withdrawValue}
          invoiseValue={invoiseValue}
        />
      )}
      {isVisibleCoferm && (
        <ConfirmationPage
          withdrawValue={withdrawValue}
          payMethod={payMethod}
          invoiseValue={invoiseValue}
          invoisePayMethod={invoisePayMethod}
          withdrawPayMethod={withdrawPayMethod}
          invoicePayMethodId={invoicePayMethodId}
          withdrawPayMethodId={withdrawPayMethodId}
        />
      )}
      <Route path="/success">
        <SuccessPage />
      </Route>
    </div>
  );
};

export default App;

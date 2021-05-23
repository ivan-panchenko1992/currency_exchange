// eslint-disable-next-line import/no-unresolved
import React, { useState } from 'react';
// import './ExchangeForm.scss';
import { PayMethod } from '../../interfaces';

interface Props {
  invoicePayMethod: PayMethod[],
  setPage: React.Dispatch<React.SetStateAction<string>>,
  setInvoicePayMethodId: React.Dispatch<React.SetStateAction<number>>,
  handleChangeValue: any,
  setWithdrawPayMethodId: React.Dispatch<React.SetStateAction<number>>,
  invoiceValue: string,
  withdrawValue: string,
  withdrawPayMethod: PayMethod[],
  isLoading:boolean,
}

export const ExchangeForm: React.FC<Props> = ({
  setPage,
  setInvoicePayMethodId,
  handleChangeValue,
  setWithdrawPayMethodId,
  invoiceValue,
  withdrawValue,
  invoicePayMethod,
  withdrawPayMethod,
  isLoading,
}) => {
  const [isNotAdd, setIsNotAdd] = useState(false);

  const exchangeSubmit = (event: any) => {
    event.preventDefault();
    if (invoiceValue !== '' && withdrawValue !== '') {
      setPage('conferm');
      setIsNotAdd(false);
    }
    setIsNotAdd(true);
  };
  return (
    <form
      className="form-container"
      onSubmit={(event) => exchangeSubmit(event)}
      noValidate
    >
      <div className="card-container">
        <div className="card-exchange">
          <h1 className="card-exchange__heading">Sell</h1>
          <select
            name="select"
            className="card-exchange__select"
            onChange={(event) => {
              setInvoicePayMethodId(+event.target.value);
            }}
          >
            {invoicePayMethod.map((method) => (
              <option
                value={method.id}
                key={method.id}
              >
                {method.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="invoice"
            min="0.01"
            value={invoiceValue}
            placeholder="write your numbers"
            className="card-exchange__input"
            onChange={(event) => handleChangeValue(event)}
          />
        </div>
        <div className="card-exchange">
          <h1 className="card-exchange__heading">Buy</h1>
          <select
            name="select"
            className="card-exchange__select"
            onChange={(event) => setWithdrawPayMethodId(+event.target.value)}
          >
            {withdrawPayMethod.map((method) => (
              <option
                value={method.id}
                key={method.id}
              >
                {method.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="withdraw"
            min="0.01"
            value={withdrawValue}
            placeholder="write your numbers"
            className="card-exchange__input"
            onChange={(event) => handleChangeValue(event)}
          />
        </div>
      </div>
      {isNotAdd
        && <p>❌You forgot to enter quantity of currencies❌</p>}
      <div className="button-container">
        <button
          className="button-container__button"
          type="submit"
          disabled={isLoading}
        >
          Exchange
        </button>
      </div>
    </form>
  );
};

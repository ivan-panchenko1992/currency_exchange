// eslint-disable-next-line import/no-unresolved
import React, { useState } from 'react';
import './ExchangeForm.scss';
import { PayMethod } from '../../interfaces';

interface Props {
  invoisePayMethod: PayMethod[],
  setPage: any,
  setInvoicePayMethodId: any,
  handleChangeValue: any,
  setWithdrawPayMethodId: any,
  invoiseValue: string,
  withdrawValue: string,
  withdrawPayMethod: PayMethod[],
}

export const ExchangeForm: React.FC<Props> = ({
  setPage,
  setInvoicePayMethodId,
  handleChangeValue,
  setWithdrawPayMethodId,
  invoiseValue,
  withdrawValue,
  invoisePayMethod,
  withdrawPayMethod,
}) => {
  const [isNotAdd, setNotAdd] = useState(false);

  const exchangeSubmit = (event: any) => {
    event.preventDefault();
    if (invoiseValue !== '' && withdrawValue !== '') {
      setPage('conferm');
      setNotAdd(false);
    }
    setNotAdd(true);
  };
  return (
    <form
      className="container"
      onSubmit={(event) => exchangeSubmit(event)}
    >
      <div className="card-container">
        <div className="card">
          <h1 className="card__heading">Sell</h1>
          <select
            name="select"
            className="card__select"
            onChange={(event) => {
              setInvoicePayMethodId(+event.target.value);
            }}
          >
            {invoisePayMethod.map((method) => (
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
            value={invoiseValue}
            placeholder="write your numbers"
            className="card__input"
            onChange={(event) => handleChangeValue(event)}
          />
        </div>
        <div className="card">
          <h1 className="card__heading">Buy</h1>
          <select
            name="select"
            className="card__select"
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
            value={withdrawValue}
            placeholder="write your numbers"
            className="card__input"
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
        >
          Exchange
        </button>
      </div>
    </form>
  );
};

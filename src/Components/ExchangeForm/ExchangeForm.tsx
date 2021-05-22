// eslint-disable-next-line import/no-unresolved
import React from 'react';
import './ExchangeForm.scss';
import { PayMethod } from '../../interfaces';

interface Props {
  invoisePayMethod: PayMethod[],
  setPage: any,
  // onExchange: any,
  setInvoicePayMethodId: any,
  handleChangeValue: any,
  setWithdrawPayMethodId: any,
  invoiseValue: string,
  withdrawValue: string,
  withdrawPayMethod: PayMethod[],
}

export const ExchangeForm: React.FC<Props> = ({
  // onExchange,
  setPage,
  setInvoicePayMethodId,
  handleChangeValue,
  setWithdrawPayMethodId,
  invoiseValue,
  withdrawValue,
  invoisePayMethod,
  withdrawPayMethod,
}) => {
  const exchangeHandler = (event: any) => {
    event.preventDefault();
    setPage('conferm');
  };
  return (
    <form
      className="container"
      onSubmit={(event) => exchangeHandler(event)}
    >
      <div className="card-container">
        <div className="card">
          <h1 className="card__heading">Sell</h1>
          <select
            name="select"
            className="card__select"
            onChange={(event) => (
              setInvoicePayMethodId(+event.target.value))}
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
            required
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
            required
            value={withdrawValue}
            placeholder="write your numbers"
            className="card__input"
            onChange={(event) => handleChangeValue(event)}
          />
        </div>
      </div>
      <div className="button-container">
        <button
          className="button-container__button"
          type="submit"
          // onClick={() => setIsVisibleCoferm('conferm')}
        >
          Exchange
        </button>
      </div>
    </form>
  );
};

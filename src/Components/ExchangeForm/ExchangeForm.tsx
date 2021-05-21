// eslint-disable-next-line import/no-unresolved
import React from 'react';
import './ExchangeForm.css';
import { PayMethod } from '../../interfaces';

interface Props {
  invoisePayMethod: PayMethod[],
  setIsVisibleCoferm: any,
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
  setIsVisibleCoferm,
  setInvoicePayMethodId,
  handleChangeValue,
  setWithdrawPayMethodId,
  invoiseValue,
  withdrawValue,
  invoisePayMethod,
  withdrawPayMethod,
}) => (
  <form
    className="container"
    // onSubmit={(event) => onExchange(event)}
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
          <option value="null">All currency</option>
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
          <option value="null">All currency</option>
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
    <div className="button-container">
      <button
        className="button"
        type="button"
        onClick={() => setIsVisibleCoferm(true)}
      >
        Exchange
      </button>
    </div>
  </form>
);

// eslint-disable-next-line import/no-unresolved
import React from 'react';
import './ConfirmationPage.css';
import { PayMethod } from '../../interfaces';

interface Props {
  payMethod: string,
  invoiseValue: string,
  withdrawValue: string,
  invoisePayMethod: PayMethod[],
  withdrawPayMethod: PayMethod[],
  invoicePayMethodId: number,
  withdrawPayMethodId: number,
}

export const ConfirmationPage: React.FC<Props> = ({
  invoiseValue,
  withdrawValue,
  invoisePayMethod,
  withdrawPayMethod,
  invoicePayMethodId,
  withdrawPayMethodId,

}) => {
  const invoicePayMethodName = invoisePayMethod
    .find((method) => method.id === invoicePayMethodId);
  const withdrawPayMethodName = withdrawPayMethod
    .find((method) => method.id === withdrawPayMethodId);

  return (
    <div className="card-confirmation">
      <h1 className="card-confirmation__heading">Details</h1>
      <div className="card-confirmation__invoise">
        <p className="card-confirmation__invoise-sell">Sell:</p>
        <p
          className="card-confirmation__invoise-quontity"
        >
          {invoiseValue}
          {' '}
          {invoicePayMethodName?.name}
        </p>
      </div>
      <div className="card-confirmation__withdraw">
        <p className="card-confirmation__withdraw-buy">Buy:</p>
        <p
          className="card-confirmation__withdraw-quontity"
        >
          {withdrawValue}
          {' '}
          {withdrawPayMethodName?.name}
        </p>
      </div>
      <div className="card-confirmation__button">
        <button
          type="button"
          className="card-confirmation__button-cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="card-confirmation__button-confirme"
        >
          Confirme
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

import classNames from 'classnames';
import { PayMethod, ConfirmatoryAnswer } from '../../interfaces';
import { getSuccess } from '../../Api/PayMethod';

interface Props {
  payMethod: string,
  invoiceValue: string,
  withdrawValue: string,
  invoicePayMethod: PayMethod[],
  withdrawPayMethod: PayMethod[],
  invoicePayMethodId: number,
  withdrawPayMethodId: number,
  setPage: React.Dispatch<React.SetStateAction<string>>,
  reset: any,
}

export const ConfirmationPage: React.FC<Props> = ({
  invoiceValue,
  withdrawValue,
  invoicePayMethod,
  withdrawPayMethod,
  invoicePayMethodId,
  withdrawPayMethodId,
  setPage,
  payMethod,
  reset,

}) => {
  const [isLoading, setIsLoading] = useState(false);

  const invoicePayMethodName = invoicePayMethod
    .find((method) => method.id === invoicePayMethodId);
  const withdrawPayMethodName = withdrawPayMethod
    .find((method) => method.id === withdrawPayMethodId);

  const confirmation = () => {
    setIsLoading(true);
    if (payMethod === 'invoice') {
      getSuccess(invoiceValue, payMethod, invoicePayMethodId, withdrawPayMethodId)
        .then((result: ConfirmatoryAnswer) => {
          if (result.message === 'Success') {
            setIsLoading(false);
            setPage('success');
          }
        });
    }
    if (payMethod === 'withdraw') {
      getSuccess(withdrawValue, payMethod, invoicePayMethodId, withdrawPayMethodId)
        .then((result: ConfirmatoryAnswer) => {
          if (result.message === 'Success') {
            setIsLoading(false);
            setPage('success');
          }
        });
    }
  };

  return (
    <div className={classNames('card-confirmation', {
      'card-confirmation-loading': isLoading,
    })}
    >
      <h1 className="card-confirmation__heading">Details</h1>
      <div className="card-confirmation__invoise">
        <p className="card-confirmation__invoise-sell">Sell:</p>
        <p
          className="card-confirmation__invoise-quontity"
        >
          {invoiceValue}
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
          disabled={isLoading}
          className="card-confirmation__button-cancel"
          onClick={() => reset()}
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="card-confirmation__button-confirme"
          onClick={() => confirmation()}
        >
          {isLoading
            ? 'Loading...'
            : 'Confirme'}
        </button>
      </div>
    </div>
  );
};

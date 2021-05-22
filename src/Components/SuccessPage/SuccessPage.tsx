// eslint-disable-next-line import/no-unresolved
import React from 'react';
import './SuccessPage.scss';
import Vector from '../../images/Vector.svg';

interface Props {
  setPage: any,
}

export const SuccessPage: React.FC<Props> = ({ setPage }) => (
  <form className="success-page">
    <img alt="success" src={Vector} />
    <h1 className="success-page__heading">Success!</h1>
    <p className="success-page__text">
      Your exchange order has been placed
      <br />
      successfully and will be processed soon.
    </p>
    <button
      type="button"
      className="success-page__button"
      onClick={() => setPage('form')}
    >
      Home
    </button>

  </form>
);

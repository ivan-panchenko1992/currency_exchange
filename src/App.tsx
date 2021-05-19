import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Card, CardTitle, Input, FormGroup, ButtonToggle,
} from 'reactstrap';
import { getPayMethods, getValueInvoise } from './Api/PayMethod';
import { ResultPaymethods, PayMethod, Amount } from './interfaces';

const App: React.FC = () => {
  const [invoisePayMethod, setInvosePayMethod] = useState<PayMethod[]>([]);
  const [withdrawPayMethod, setWithdrawPayMethod] = useState<PayMethod[]>([]);
  const [invoicePayMethodId, setInvoicePayMethodId] = useState(0);
  const [withdrawPayMethodId, setWithdrawPayMethodId] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState('');
  const [invoiseValue, setInvoiseValue] = useState('');

  useEffect(() => {
    getPayMethods().then((result: ResultPaymethods) => {
      setInvosePayMethod(result.invoice);
      setWithdrawPayMethod(result.withdraw);
    });
  }, []);

  const handleChangeValue = (event: any) => {
    const { name, value } = event.target;

    if (name === 'invoise') {
      setInvoiseValue(value);
      if (value) {
        getValueInvoise(invoicePayMethodId, 'invoice', withdrawPayMethodId, value)
          .then((result: Amount) => setWithdrawValue(String(result.amount)));
      } else {
        setWithdrawValue('');
      }
      return;
    }

    if (name === 'withdraw') {
      setWithdrawValue(value);
      if (value) {
        getValueInvoise(invoicePayMethodId, 'withdraw', withdrawPayMethodId, value)
          .then((result: Amount) => setInvoiseValue(String(result.amount)));
      } else {
        setInvoiseValue('');
      }
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card-container">
          <div className="card">
            <Card body>
              <CardTitle tag="h1" className="card__heading">Sell</CardTitle>
              <FormGroup className="form-groop">
                <Input
                  type="select"
                  name="select"
                  className="card__select"
                  onChange={(event) => setInvoicePayMethodId(+event.target.value)}
                >
                  <option value="0">All currency</option>
                  {invoisePayMethod.map((method) => (
                    <option
                      value={method.id}
                      key={method.id}
                    >
                      {method.name}
                    </option>
                  ))}
                </Input>
                <Input
                  type="number"
                  name="invoise"
                  value={invoiseValue}
                  placeholder="write your numbers"
                  className="card__input"
                  onChange={(event) => handleChangeValue(event)}
                />
              </FormGroup>
            </Card>
          </div>
          <div className="card">
            <Card body>
              <CardTitle tag="h1" className="card__heading">Buy</CardTitle>
              <FormGroup className="form-groop">
                <Input
                  type="select"
                  name="select"
                  className="card__select"
                  onChange={(event) => setWithdrawPayMethodId(+event.target.value)}
                >
                  <option value="0">All currency</option>
                  {withdrawPayMethod.map((method) => (
                    <option
                      value={method.id}
                      key={method.id}
                    >
                      {method.name}
                    </option>
                  ))}
                </Input>
                <Input
                  type="number"
                  name="withdraw"
                  value={withdrawValue}
                  placeholder="write your numbers"
                  className="card__input"
                  onChange={(event) => handleChangeValue(event)}
                />
              </FormGroup>
            </Card>
          </div>
        </div>
        <div className="button-container">
          <ButtonToggle className="button">
            Exchange
          </ButtonToggle>
        </div>
      </div>
    </div>
  );
};

export default App;

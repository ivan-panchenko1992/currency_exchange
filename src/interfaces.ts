export interface PayMethod {
  id: number;
  name: string;
}

export interface ResultPaymethods {
 invoice: PayMethod[];
 withdraw: PayMethod[];
}

export interface QueryStringParams {
  base: 'invoice' | 'withdraw';
  amount: number;
  invoicePayMethod: number;
  withdrawPayMethod: number;
}

export interface Amount{
  amount: number;
}

export interface PostBody {
  amount: number;
  base: 'invoice' | 'withdraw';
  invoicePayMethod: number;
  withdrawPayMethod: number;
}
export interface СonfirmingAnswer {
  message: string
}

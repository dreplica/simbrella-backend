export interface TransportOptionTypes {
    host: string;
    port: number;
    secure?: boolean;
    auth: {
      type: string;
      pass?: string;
    };
  }
  
 export interface SendOptionsTypes {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }
  
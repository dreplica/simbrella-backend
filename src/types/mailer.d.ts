export interface TransportOptionTypes {
    host: string;
    port: number;
    secure?: boolean;
    auth: {
      user: string;
      type: string;
      clientId: string;
      clientSecret: string;
      refreshToken: string;
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
  
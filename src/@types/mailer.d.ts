export interface TransportOptionTypes {
    host: string;
    port: number;
    secure?: boolean;
    auth: {
      user: string;
      pass?: string;
    };
    tls: {
      rejectUnauthorized: boolean, // Optional, helps with certificate issues
    },
  }
  
 export interface SendOptionsTypes {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }
  
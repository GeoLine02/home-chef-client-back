import * as session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    order: any;
  }
}

declare module 'express' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}

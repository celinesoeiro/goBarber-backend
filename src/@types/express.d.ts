declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}

/** 
 * sobrescreve as tipagens.
 * Nesse caso acrescentou uma prop user com a prop id.
 */
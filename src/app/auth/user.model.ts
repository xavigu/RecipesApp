export class User {
  // Si añades con public los argumentos en el constructor no tienes que definirlos fuera y asignarselos a los argumentos del constructor
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // getter es como un method pero accedes a él como si fuera una property (user.token)
  get token() {
    // condition para saber si el tokenexpiration no existe o el tiempo ya ha pasado
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

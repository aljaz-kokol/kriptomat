export class UrlBuilder {
  private readonly _url: string;
  constructor(private _baseUrl: string, private _actions: string[]) {
    this._url = [_baseUrl, ..._actions].join('/')
  }

  public toString = (): string => this._url;
}

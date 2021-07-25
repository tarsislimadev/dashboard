
export class Page {
  public pageData: any = {
    loading: true,
    _error: null,
    errorMessage: null,
    get error() {
      return this.errorMessage
    },
    set error(value: any) {
      //
    },
  }
}

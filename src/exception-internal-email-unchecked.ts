import Exception from './exception';

export default class ExceptionInternalEmailUnchecked extends Exception {
  constructor(msg: string | undefined) {
    super(msg);
    Object.setPrototypeOf(this, ExceptionInternalEmailUnchecked.prototype);
  }
}
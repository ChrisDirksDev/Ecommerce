export class AppError extends Error {
  statusCode: number | undefined;

  constructor(message: string, statusCode: number | undefined = undefined) {
    super(message);
    this.statusCode = statusCode;
  }
}

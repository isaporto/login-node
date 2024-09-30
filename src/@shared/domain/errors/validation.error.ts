export default class ValidationError extends Error {
  constructor(message?: string) {
    super(message || "This field is invalid");
    this.name = "Invalid field";
  }
}
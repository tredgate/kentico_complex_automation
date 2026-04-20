// TODO: make a credentials list for multiple users, e.g. admin, regular user, etc. and implement a way to select which credentials to use in tests
export class CredentialManager {
  private credentials: Record<string, string>;

  constructor() {
    this.credentials = {};
  }

  async setupCredentials(usernameKey: string, passwordKey: string) {
    this.credentials = {
      username: await this.getSecret(usernameKey),
      password: await this.getSecret(passwordKey),
    };
    return this.credentials;
  }

  async getSecret(key: string): Promise<string> {
    const value = process.env[key];
    if (!value) {
      throw new Error(
        `Secret with key "${key}" not found in environment variables.`,
      );
    }
    return value;
  }

  getUsername(): string {
    if (!this.credentials || !this.credentials.username) {
      throw new Error("Username not set up. Call setupCredentials() first.");
    }
    return this.credentials.username;
  }

  getPassword(): string {
    if (!this.credentials || !this.credentials.password) {
      throw new Error("Password not set up. Call setupCredentials() first.");
    }
    return this.credentials.password;
  }
}

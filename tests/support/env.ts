import path from "node:path";
import dotenv from "dotenv";

const ENV_FILE_PATH = path.resolve(__dirname, "../../.env");
let cachedEnv: TestEnv | null = null;
let isDotenvLoaded = false;

export type TestEnv = {
  BASE_URL: string;
  USER_EMAIL: string;
  USER_PASS: string;
  INITIAL_BALANCE: number;
  TRANSACTION_COUNT: number;
  POINTS_PER_TRANSACTION: number;
};

function requiredString(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function requiredNumber(name: string): number {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a number`);
  }
  return parsed;
}

function ensureDotenvLoaded(): void {
  if (isDotenvLoaded) {
    return;
  }

  const result = dotenv.config({ path: ENV_FILE_PATH });
  if (result.error && !process.env.CI) {
    throw new Error(`Unable to load .env file at ${ENV_FILE_PATH}: ${result.error.message}`);
  }

  isDotenvLoaded = true;
}

export function loadEnv(): TestEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  ensureDotenvLoaded();

  cachedEnv = {
    BASE_URL: requiredString("BASE_URL"),
    USER_EMAIL: requiredString("USER_EMAIL"),
    USER_PASS: requiredString("USER_PASS"),
    INITIAL_BALANCE: requiredNumber("INITIAL_BALANCE"),
    TRANSACTION_COUNT: requiredNumber("TRANSACTION_COUNT"),
    POINTS_PER_TRANSACTION: requiredNumber("POINTS_PER_TRANSACTION")
  };

  return cachedEnv;
}

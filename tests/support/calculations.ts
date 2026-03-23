import type { TestEnv } from "./env";

export function expectedLoyaltyBalance(env: Pick<TestEnv, "INITIAL_BALANCE" | "TRANSACTION_COUNT" | "POINTS_PER_TRANSACTION">): number {
  return env.INITIAL_BALANCE + env.TRANSACTION_COUNT * env.POINTS_PER_TRANSACTION;
}

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "ab_admin";
const MAX_AGE_SEGUNDOS = 60 * 60 * 8;

const password = () => process.env.ADMIN_PASSWORD ?? "";

export const isAdminEnabled = () => password().length > 0;

const sign = () =>
  createHmac("sha256", password()).update("awards-ballot-admin").digest("hex");

const safeEquals = (a, b) => {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
};

export function checkPassword(candidate) {
  return isAdminEnabled() && safeEquals(String(candidate ?? ""), password());
}

export async function startAdminSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, sign(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEGUNDOS,
  });
}

export async function endAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated() {
  if (!isAdminEnabled()) return false;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(token) && safeEquals(token, sign());
}

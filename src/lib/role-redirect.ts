export type RedirectRole = "admin" | "user" | null | undefined;

export function getRoleRedirectPath(role: RedirectRole) {
  return role === "admin" ? "/admin" : "/dashboard";
}

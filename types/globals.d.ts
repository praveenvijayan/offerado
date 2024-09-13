export {};
export type Roles = "admin" | "business_admin" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

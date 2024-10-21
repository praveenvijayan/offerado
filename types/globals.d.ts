export {};
export type Roles = "admin" | "business_admin" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

export interface NextRequestWithOrgAndBusiness extends NextRequest {
  organizationId: string;
  businessId: string;
}

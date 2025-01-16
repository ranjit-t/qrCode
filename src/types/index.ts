export interface Request {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

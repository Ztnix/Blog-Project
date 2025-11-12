import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

export async function ensureAdmin(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated())
    return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { roles: true },
  });
  const isAdmin = (user?.roles || []).some((r) => r.name === "Admin");
  if (!isAdmin) return res.status(403).json({ error: "Forbidden" });
  next();
}

export async function ensureMasterAdmin(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated())
    return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { roles: true },
  });
  const isAdmin = (user?.roles || []).some((r) => r.name === "MasterAdmin");
  if (!isAdmin) return res.status(403).json({ error: "Only 4 the GOAT" });
  next();
}

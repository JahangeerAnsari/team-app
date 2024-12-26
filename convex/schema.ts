import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";
import { v } from "convex/values";
const schema = defineSchema({
    ...authTables
  });

export default schema;
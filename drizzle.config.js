

/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_vNow6eY7yUiD@ep-tight-base-a500zuo7-pooler.us-east-2.aws.neon.tech/Portfolio%20Builder?sslmode=require',
  },
};

console.log("Load db.ts");

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
console.log("MONGODB_URI =", MONGODB_URI);
// if (!MONGODB_URI) {
//   throw new Error("Missing MONGODB_URI in .env.local");
// }

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB() {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      dbName: "crafolio",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

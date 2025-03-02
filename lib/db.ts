import sqlite3 from "sqlite3"
import { open } from "sqlite"

let db: any = null

async function openDb() {
  if (!db) {
    db = await open({
      filename: "./mydb.sqlite",
      driver: sqlite3.Database,
    })

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
      )
    `)
  }
  return db
}

export { openDb }


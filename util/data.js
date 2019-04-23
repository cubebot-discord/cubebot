const Database = require('better-sqlite3')

const db = new Database('data.sqlite3')

exports.AcceptDatabase = class AcceptDatabase {
  constructor () {
    this.db = db
    this.cache = new Map()

    this.setup()
    this.statements = {
      create: this.db.prepare('INSERT INTO accept (guild) VALUES (?)'),
      has: this.db.prepare('SELECT guild FROM accept WHERE guild = ?'),
      get: this.db.prepare('SELECT * FROM accept WHERE guild = ?'),
      set: {
        channel: this.db.prepare(
          'UPDATE accept SET channel = ? WHERE guild = ?'
        ),
        role: this.db.prepare('UPDATE accept SET role = ? WHERE guild = ?'),
        enabled: this.db.prepare(
          'UPDATE accept SET enabled = ? WHERE guild = ?'
        )
      }
    }
  }

  setup () {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS accept (
          guild   TINYTEXT PRIMARY KEY,
          channel TINYTEXT,
          role    TINYTEXT,
          enabled TINYINT  NOT NULL DEFAULT 0
        )`
      )
      .run()
  }

  create (id) {
    if (this.has(id)) {
      throw new RangeError('Guild already exists')
    }

    this.statements.create.run(id)
    this.cache.set(id, {
      guild: id,
      channel: null,
      role: null,
      enabled: false
    })

    return this.get(id)
  }

  has (id) {
    if (this.cache.has(id)) return true

    return Boolean(this.statements.has.get(id))
  }

  get (id) {
    if (this.cache.has(id)) {
      return this.cache.get(id)
    } else if (!this.has(id)) {
      return null
    }

    const data = this.statements.get.get(id)
    this.cache.set(id, data)

    return Object.assign(data, { enabled: Boolean(data.enabled) })
  }

  set (id, key, value) {
    if (!this.cache.has(id)) {
      this.get(id)
    }
    if (!/channel|role|enabled/.test(key)) {
      throw new RangeError('Invalid key')
    }

    this.statements.set[key].run(key === 'enabled' ? Number(value) : value, id)
    this.cache.get(id)[key] = value

    return this.get(id)
  }
}

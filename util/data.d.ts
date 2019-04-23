import { Snowflake } from 'discord.js'

export type AcceptGuild = {
  guild: Snowflake
  channel: Snowflake,
  role: Snowflake,
  enabled: boolean
}
export class AcceptDatabase {
  protected db: any
  protected cache: Map<Snowflake, AcceptGuild>
  
  setup (): void
  create (id: Snowflake): AcceptGuild
  has (id: Snowflake): boolean
  get (id: Snowflake): AcceptGuild
  
  set (id: Snowflake, key: 'channel' | 'role', value: Snowflake): AcceptGuild
  set (id: Snowflake, key: 'enabled', value: boolean): AcceptGuild
}

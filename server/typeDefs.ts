import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    log: Log!
    logs: [Log!]
    setting: Setting!
  }
  type Mutation {
    setLed: Led
    setSetting(set_point: Int!, set_point_tolerance: Int!): Setting
    startRecording: Session
    pauseRecording: Session
    stopRecording: Session
    on: Boolean
    off: Boolean
  }
  type Subscription {
    newTemp: Temp
  }
  type User {
    name: String
  }
  type Log {
    id: Int
    created_at: String
    temperature: String
    humidity: String
    switch: String
  }
  type Setting {
    id: Int
    created_at: String
    set_point: String
    set_point_tolerance: String
  }
  type Temp {
    temperature: String
  }
  type Led {
    status: String
  }
  type Session {
    id: Int
  }
`;
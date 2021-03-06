export interface LogType {
  id: number;
  temperature: string;
  humidity: string;
  created_at: string;
  switch: string;
}

export interface PlotDataType {
  x: number,
  y: number
}


export interface Session {
  status: string;
  logs: Array<Log>;
}

export interface Setting {
  set_point: number;
  set_point_tolerance: number;
}

export interface Log {
  temperature: number;
  humidity: number;
  switch: boolean;
  set_point: number;
  set_point_tolerence: number;
  session: Array<Session>;
}

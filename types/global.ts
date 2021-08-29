export interface Session {
  id: number
  status: string;
  logs: Array<Log>;
}
export interface Log {
  id: number;
  created_at: string;
  temperature: string;
  humidity: string;
  switch: string;
  set_point: number;
  set_point_tolerence: number;
  session: Array<Session>;
}

export interface PlotDataType {
  x: number,
  y: number
}
export interface Setting {
  set_point: number;
  set_point_tolerance: number;
}



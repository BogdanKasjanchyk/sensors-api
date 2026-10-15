export interface HumiditySensor {
  id: string;
  timestamp: Date;
  sensorName: string;
  value: number;
  unit: string;
  location?: string;
}

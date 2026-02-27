
export type CoopSensor = {
  _id: string;
  created_date: string;
  data: {
    battery: number;
    outside: {
      air_temp: number;
      humidity: number;
    };
    coop: {
      coop_humidity: number;
      coop_temp: number;
      coop_gas: number;
      coop_pressure: number;
    };
  };
};
export type GerminatorSensor = {
  id: string;
  created_date: string;
  updated_date: string;
  data: {
    air: {
      humidity?: {
        actual: number;
        target: [number, number];
      };
      temperature?: {
        actual: number;
        target: [number, number];
      };
    };
    soil: {
      moisture?: number;
      soil_temp?: number;
    };
    lights: boolean;
  };
  device_id: string;
};

export type GardenDevice = {
  id: string;
  name: string;
  description?: string;
  notes?: string;
};

export type GardenSensor = {
  id: string;
  created_date: string;
  updated_date: string;
  data: {
    moisture: number;
    temperature: number;
  };
  device_id: string;
};

export type CoopSensor = {
  _id: string;
  created_date: string;
  updated_date: string;
  data: {
    battery: number;
    outside: {
      air_temp: number;
      humidity: number;
    };
    coop: {
      coop_humidity: number;
      coop_temp: number;
      coop_gas: number; // VOC index
      coop_pressure: number;
    };
  };
};

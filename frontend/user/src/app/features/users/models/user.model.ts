export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  ip: string;
  macAddress: string;
  university: string;
  ein: string;
  ssn: string;
  userAgent: string;
  role: string;
  hair?: {
    color: string;
    type: string;
  };
  address?: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  bank?: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company?: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      country: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  };
  crypto?: {
    coin: string;
    wallet: string;
    network: string;
  };
}

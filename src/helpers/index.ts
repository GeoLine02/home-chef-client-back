import * as bcrypt from 'bcrypt';
import * as moment from 'moment'; // Import moment like this
// eslint-disable-next-line @typescript-eslint/no-var-requires
const haversine = require('haversine');

export async function hashStr(str: string, saltOrRounds = 5): Promise<string> {
  const hash = await bcrypt.hash(str, saltOrRounds);
  return hash;
}

export const isEmail = (email: string): boolean => /^\S+@\S+\.\S+$/.test(email);

export const isPhoneNumber = (phoneNumber: string): boolean =>
  /^\(?\d{3}\)?[\s-]?\d{3}-\d{2}-\d{2}$/.test(phoneNumber);

export const isTimeBetweenTimeStamps = (
  timeStamp1: string,
  timeStamp2: string,
): boolean => {
  const isBetween = moment(timeStamp1, 'HH:mm:ss').isBetween(
    moment(timeStamp1, 'HH:mm:ss'),
    moment(timeStamp2, 'HH:mm:ss'),
    null,
    '[]',
  );

  return isBetween;
};

export const datePicker = () => {
  const formattedTime = moment().format('HH:mm:ss');
  return {
    time: formattedTime,
  };
};

//calculates distance between 2 objects
export const calculateDistance = (
  coords1: { longitude: number; latitude: number },
  coords2: { longitude: number; latitude: number },
  unit = 'meter',
) => {
  const start = {
    latitude: coords1.latitude,
    longitude: coords1.longitude,
  };

  const end = {
    latitude: coords2.latitude,
    longitude: coords2.longitude,
  };

  return haversine(start, end, { unit });
};

export const mToKM = (m: number): number => +(m / 1000).toFixed(3);

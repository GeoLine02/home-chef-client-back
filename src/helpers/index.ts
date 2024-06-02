import * as bcrypt from 'bcrypt';
import * as moment from 'moment'; // Import moment like this

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

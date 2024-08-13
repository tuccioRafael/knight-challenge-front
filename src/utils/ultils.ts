import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Attributes } from "../emums";
import { AttributesType, KnightType, WeaponType } from "../interfaces/knight.interface";

export const calcAge = (birthday: Date) => {
  const today = dayjs();
  const birthDate = dayjs(birthday);
  let age = today.year() - birthDate.year();
  
  if (today.isBefore(birthDate.add(age, 'year'))) {
    age--;
  }

  return age;
}

export const calcXp = (birthday: Date) => {
  const age = calcAge(birthday);
  if (age < 7) {
    return 0;
  }
  return Math.floor((age - 7) * Math.pow(22, 1.45));
}

export const modifier = (value: number) => {
  if (value >= 0 && value <= 8) return -2;
  if (value >= 9 && value <= 10) return -1;
  if (value >= 11 && value <= 12) return 0;
  if (value >= 13 && value <= 15) return 1;
  if (value >= 16 && value <= 18) return 2;
  if (value >= 19 && value <= 20) return 3;
  return 0; // Default if out of range
}

export const calcModWeapon = (attrWeapon: Attributes, attributes: AttributesType) => {
  return modifier(attributes[attrWeapon]);
}

export const calcAttack = (knight: KnightType) => {
  //pegar a arma que esta equipada;

  const [modWeapon] = knight.weapons.filter((weapon: WeaponType) => weapon.equipped);
  console.log(modWeapon);


  //preciso pegar o valor do atributo chave do cavaleiro
  return 10 + modifier(knight.attributes['strength']) + modWeapon.mod;
}

export const formatDate = (date: Date): string => {
  return dayjs(date).add(1, 'day').locale('pt-br').format('DD/MM/YYYY');
};
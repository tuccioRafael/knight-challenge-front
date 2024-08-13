import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { calcAge, calcModWeapon, calcXp, formatDate, modifier } from '../../utils/ultils';
import { Attributes } from '../../emums';

// Teste para calcAge
describe('calcAge', () => {
  it('deve calcular a idade corretamente', () => {
    const birthday = new Date('2000-01-01');
    const expectedAge = dayjs().year() - dayjs(birthday).year() -1;
    const age = calcAge(birthday);
    expect(age).toBe(expectedAge);
  });

  it('deve calcular a idade corretamente quando o aniversário ainda não aconteceu neste ano', () => {
    const birthday = new Date('2000-12-31');
    const expectedAge = dayjs().year() - dayjs(birthday).year() - 1;
    const age = calcAge(birthday);
    expect(age).toBe(expectedAge);
  });
});


describe('calcXp', () => {
  it('deve calcular XP corretamente para idade menor que 7', () => {
    const birthday = new Date('2017-01-01');
    const xp = calcXp(birthday);
    expect(xp).toBe(0);
  });

  it('deve calcular XP corretamente para idade maior que 7', () => {
    const birthday = new Date('2000-01-01');
    const age = dayjs().year() - dayjs(birthday).year() - 1;
    const expectedXp = Math.floor((age - 7) * Math.pow(22, 1.45));
    const xp = calcXp(birthday);
    expect(xp).toBe(expectedXp);
  });
});

// Teste para calcModWeapon
describe('calcModWeapon', () => {
  it('deve calcular o modificador da arma corretamente', () => {
    const attributes = {
      strength: 10,
      dexterity: 12,
      constitution: 14,
      intelligence: 16,
      wisdom: 18,
      charisma: 20,
    };
    const attrWeapon = Attributes.STRENGTH;
    const expectedModifier = -1; // Modificador para o valor 10
    const mod = calcModWeapon(attrWeapon, attributes);
    expect(mod).toBe(expectedModifier);
  });
});

// Teste para calcAttack
describe('calcAttack', () => {
  it('should calculate the modifier attributes', () => {
    const strength = 7;
    const dexterity = 10;

    const constitution = 12;
    const intelligence = 14;
    const wisdom = 16;
    const charisma = 20;

    expect(-2).toBe(modifier(strength));
    expect(-1).toBe(modifier(dexterity));
    expect(0).toBe(modifier(constitution));
    expect(1).toBe(modifier(intelligence));
    expect(2).toBe(modifier(wisdom));
    expect(1).toBe(modifier(intelligence));
    expect(3).toBe(modifier(charisma));
  });

});

// Teste para formatDate
describe('formatDate', () => {
  it('deve formatar a data corretamente', () => {
    const date = new Date('2024-08-14');
    const expectedDate = dayjs(date).add(1, 'day').locale('pt-br').format('DD/MM/YYYY');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe(expectedDate);
  });
});

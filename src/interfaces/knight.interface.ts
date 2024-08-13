export interface WeaponType {
    _id: string;
    name: string;
    mod: number;
    attr: string;
    equipped: boolean;
}

export interface AttributesType {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface KnightType {
    _id: string;
    name: string;
    nickname: string;
    birthday: string;
    weapons: WeaponType[];
    keyAttribute: string;
    attributes: AttributesType;
}

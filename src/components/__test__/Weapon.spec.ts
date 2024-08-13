import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Weapon from '../Weapon.vue';

describe('Weapon.vue', () => {
  const mockEquipWeapon = vi.fn();

  const props = {
    _id: '1',
    name: 'Sword of Truth',
    attr: 'Strength +10',
    equipped: false,
    equipWeapon: mockEquipWeapon,
  };

  it('renders the correct name and attr', () => {
    const wrapper = shallowMount(Weapon, {
      props,
    });

    expect(wrapper.text()).toContain('Sword of Truth');
    expect(wrapper.text()).toContain('Strength +10');
  });

  it('applies the correct class when equipped', async () => {
    const wrapper = shallowMount(Weapon, {
      props: { ...props, equipped: true },
    });

    expect(wrapper.classes()).toContain('equipped');
    expect(wrapper.classes()).not.toContain('weapon');
  });

  it('applies the correct class when not equipped', () => {
    const wrapper = shallowMount(Weapon, {
      props,
    });

    expect(wrapper.classes()).toContain('weapon');
    expect(wrapper.classes()).not.toContain('equipped');
  });

  it('calls equipWeapon with the correct id when clicked', async () => {
    const wrapper = shallowMount(Weapon, {
      props,
    });

    await wrapper.trigger('click');
    expect(mockEquipWeapon).toHaveBeenCalledWith('1');
  });
});

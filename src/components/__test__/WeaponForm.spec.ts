import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import WeaponForm from '../WeaponForm.vue';

describe('WeaponForm', () => {
  it('should render form elements correctly', () => {
    const wrapper = shallowMount(WeaponForm, {
      props: {
        getWeapons: vi.fn(),
        cancelWeaponForm: vi.fn(),
      },
    });

    // Check if form elements are present
    expect(wrapper.find('input#name').exists()).toBe(true);
    expect(wrapper.find('select#keyAttribute').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Adicionar');
    expect(wrapper.find('#cancel').text()).toBe('cancel');
  });

  it('should call getWeapons with correct data on form submit', async () => {
    const getWeaponsMock = vi.fn();
    const cancelWeaponFormMock = vi.fn();
    const wrapper = mount(WeaponForm, {
      props: {
        getWeapons: getWeaponsMock,
        cancelWeaponForm: cancelWeaponFormMock,
      },
    });

    // Fill in form fields
    await wrapper.find('input#name').setValue('Excalibur');
    await wrapper.find('select#keyAttribute').setValue('strength');

    // Submit the form
    await wrapper.find('form').trigger('submit.prevent');

    expect(getWeaponsMock).toHaveBeenCalledWith({
      _id: expect.any(String),
      name: 'Excalibur',
      attr: 'strength',
      equipped: true,
    });
  });

  it('should call cancelWeaponForm on cancel button click', async () => {
    const getWeaponsMock = vi.fn();
    const cancelWeaponFormMock = vi.fn();
    const wrapper = mount(WeaponForm, {
      props: {
        getWeapons: getWeaponsMock,
        cancelWeaponForm: cancelWeaponFormMock,
      },
    });

    await wrapper.find('#cancel').trigger('click');

    expect(cancelWeaponFormMock).toHaveBeenCalled();
  });
});

import { shallowMount } from '@vue/test-utils'

import Example from './Example.vue'

describe('Example component', () => {
  it('will mount', () => {
    const wrapper = shallowMount(Example)
    expect(wrapper.text()).toContain('Hello, John!')
    wrapper.destroy()
  })
})

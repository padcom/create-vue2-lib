import { shallowMount } from '@vue/test-utils'

import Hello from './Hello.vue'

describe('Hello component', () => {
  it('will mount', () => {
    const wrapper = shallowMount(Hello)
    expect(wrapper.text()).toContain('Hello, John!')
    wrapper.destroy()
  })
})

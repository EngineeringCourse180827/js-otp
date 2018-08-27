import {shallowMount, createLocalVue} from '@vue/test-utils'
import View from '@/views/View'
import Api from '@/api'

describe('View', function () {

    it('should set result after api call', async function () {
        const localVue = createLocalVue();
        const wrapper = shallowMount(View, {localVue})
        Api.randomEntity = jest.fn().mockReturnValue(
            Promise.resolve({
                data: {
                    entries: [{
                        API: 'Mapbox'
                    }]
                }
            })
        )

        await wrapper.find('button.go').trigger('click')

        expect(wrapper.vm.$data.result).toEqual('Mapbox')
    });

    it('should show api link toast after api call', async function () {
        const localVue = createLocalVue();
        const store = new Vuex.Store({
            api: {
                apiName: 'aaa'
            }
        })
        const wrapper = shallowMount(View, {store, localVue})
        Api.randomEntity = jest.fn().mockReturnValue(
            Promise.resolve({
                data: {
                    entries: [{
                        Link: 'http://api.link'
                    }]
                }
            })
        )
        wrapper.vm.$toasted = jest.fn()
        wrapper.vm.$toasted.show = jest.fn()

        await wrapper.find('button.go').trigger('click')

        expect(wrapper.vm.$toasted.show).toBeCalledWith('http://api.link', {
            type: 'info',
            position: 'bottom-center',
            duration: 2000
        })
    });

});

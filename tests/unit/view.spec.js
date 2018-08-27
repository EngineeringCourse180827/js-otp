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

});

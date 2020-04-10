import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ViewUI from 'view-design';
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate';

import InstagramAccountsAdd from '@/pages/instagram/InstagramAccountsAdd.vue';

import '@/plugins/iview';
import '@/plugins/v-tooltip';

let wrapper;
let store;
let state;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ViewUI);

const handleSubmit = jest.fn();

beforeEach(() => {
  state = {
    system: {
      config: {
        instMinSubscribers: 1,
        instMinPosts: 1,
      },
    },
    user: {
      info: {
        id: 1,
      },
    },
  };
  store = new Vuex.Store({
    state,
  });
  wrapper = mount(InstagramAccountsAdd, {
    localVue,
    stubs: {
    },
    mocks: {
      $t: msg => msg,
    },
    methods: {
      handleSubmit,
    },
    store,
    computed: {
    },
    components: {
      ValidationProvider,
      ValidationObserver,
    },
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('Check if mounted', () => {
  it('InstagramAccountsAdd is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe('Check form', () => {
  it('items form is a Vue instance', () => {
    const inputTextName = wrapper.find('input[type=text]');
    const buttonSubmit = wrapper.find('button[type=submit]');

    expect(inputTextName.exists()).toBe(true);
    expect(buttonSubmit.exists()).toBe(true);
  });
});

describe('Check methods', () => {
  it('Check submit form', () => {
    const form = wrapper.find('form');
    form.trigger('submit');
    wrapper.vm.$nextTick(() => {
      expect(handleSubmit).toBeCalled();
    });
  });
});

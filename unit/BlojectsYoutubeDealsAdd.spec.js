import { mount, createLocalVue } from '@vue/test-utils';
import ViewUI from 'view-design';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import breakpoint from '@sape/vue-ui/src/mixins/breakpoint';
import SapeLink from '@sape/vue-ui/src/components/SapeLink.vue';
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate';
import BlojectsYoutubeDealsAdd from '@/pages/blojects/BlojectsYoutubeDealsAdd.vue';
import '@/plugins/v-tooltip';
import moment from '@/plugins/moment/install';
import AccountInfo from '@/components/common/AccountInfo.vue';
import i18n from '@/plugins/i18n';
import '@/filters/countFormatter';

let wrapper;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ViewUI);
localVue.use(VueRouter);
localVue.use(moment);
localVue.mixin(breakpoint);
localVue.component('validation-provider', ValidationProvider);
localVue.component('validation-observer', ValidationObserver);
localVue.component('sape-link', SapeLink);

let store;
let state;
let router;

const youtubeAccountsInfoConfig = [{
  id: 28,
  channelName: 'CzarStream',
  type: 2,
  placementTypesActive: [2],
  placementPrices: [{ id: 2, price: 130 }],
  url: 'https://www.youtube.com/channel/UCAJioHOMJaWRhcK_x1QzHcw/',
  avatarImageUrl: 'https://lm.sape.ru/lfiles/youtube_account_avatar/3/3/2/28',
  isActive: true,
  isDisabled: false,
  isModerated: true,
  inactiveReason: '',
  unmoderationReason: '',
  isIncognito: false,
  socialThemes: [{ id: 65, name: 'Блоги и лайфстайл' }],
  tags: [{ text: 'политолог', isApproved: true }],
  nofAdvertsForWm: 5,
  nofSubscribers: 29900,
  nofVideos: 230,
  nofViews: 5009627,
  avgComments: 251,
  avgLikes: 1495,
  avgDislikes: 173,
  avgViews: 33981,
}];
const handleSubmit = jest.fn();

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

beforeEach(() => {
  state = {
    listNofPendingDays: 23,
  };
  store = new Vuex.Store({
    state,
  });
  router = new VueRouter({});
  wrapper = mount(BlojectsYoutubeDealsAdd, {
    data() {
      return {
        youtubeAccountsInfo: youtubeAccountsInfoConfig,
      };
    },
    mocks: {},
    stubs: {},
    localVue,
    store,
    router,
    computed: {
      listNofPendingDays: () => 23,
    },
    methods: {
      handleSubmit,
    },
    components: {
      AccountInfo,
    },
    i18n,
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('Check if component renders', () => {
  it('Component is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('Component is Loading', () => {
    expect(wrapper.html()).toContain('Загрузка');
  });
});

describe('Check rendering with data', () => {
  it('check AccountInfo rendering', () => {
    wrapper.setData({ loading: false });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains(AccountInfo)).toBeTruthy();
      expect(wrapper.contains('.account')).toBeTruthy();
    });
  });

  it('check accounts info', () => {
    wrapper.setData({ loading: false });
    wrapper.vm.$nextTick(() => {
      const accounts = wrapper.findAll('.account__item a');
      const accountsNames = youtubeAccountsInfoConfig.map(el => el.screenName);
      accounts.wrappers.forEach((account, i) => {
        expect(account.text()).toBe(accountsNames[i]);
      });
    });
  });
});

describe('Check methods', () => {
  it('check handleSubmit function', () => {
    wrapper.setData({ loading: false });
    wrapper.vm.$nextTick(() => {
      const form = wrapper.find('form');
      form.trigger('submit');
      expect(handleSubmit).toBeCalled();
    });
  });
});

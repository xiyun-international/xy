const template = `
import create from '@/views/$1/create/index.vue';
import update from '@/views/$1/update/index.vue';
import list from '@/views/$1/list/index.vue';
import detail from '@/views/$1/detail/index.vue';
import change from '@/views/$1/change/index.vue';

export default [
  {
    path: '$1/create',
    name: '$1Create',
    component: create,
  },
  {
    path: '$1/update/:id',
    name: '$1Update',
    component: update,
  },
  {
    path: '$1/list',
    name: '$1List',
    component: list,
  },
  {
    path: '$1/detail/:id',
    name: '$1Detail',
    component: detail,
  },
  {
    path: '$1/change/:id',
    name: '$1Change',
    component: change,
  },
];
`;

export default template;

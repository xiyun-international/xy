import departments from '@/views/departments/index.vue';
import children from './children';

export default [
  {
    path: '/departments',
    name: 'departments',
    meta: {
      title: '功能区 departments',
    },
    component: departments,
    children,
  },
];

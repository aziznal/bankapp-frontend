import { User } from '../interfaces/user.interface';

export const DEFAULT_USER: User = {
  email: 'mockuser@email.com',
  fullname: 'John Doe',
  debt: 1234.1,
  accounts: [
    {
      _id: '1',
      label: 'Main TL',

      balance: Math.round(Math.random() * 10 ** 4),
      transactions: [
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-08-01'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '1',
        },
        {
          action: 'SENT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-08-07'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '2',
        },
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-23'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '3',
        },
      ],
    },
    {
      _id: Math.round(Math.random() * 10 ** 6).toString(),
      balance: 3500,

      label: 'Main Dollar',
      transactions: [
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-08-13'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '4',
        },
        {
          action: 'SENT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-08-19'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '5',
        },
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-07'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '7',
        },
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-09'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '8',
        },
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-10'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '9',
        },
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-15'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '10',
        },
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-16'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '16',
        },
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-17'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '17',
        },
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-18'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '18',
        },
        {
          action: 'GOT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-19'),
          otherPerson: {
            _id: '2',
            accountLabel: '12345',
            email: 'janedoe@gmail.com',
            fullname: 'janedoe',
          },
          _id: '19',
        },
      ],
    },
    {
      _id: Math.round(Math.random() * 10 ** 6).toString(),
      label: 'Main Euro',

      balance: Math.round(Math.random() * 10 ** 4),
      transactions: [],
    },
    {
      _id: Math.round(Math.random() * 10 ** 6).toString(),
      label: 'Main Euro',

      balance: Math.round(Math.random() * 10 ** 4),
      transactions: [],
    },
    {
      _id: Math.round(Math.random() * 10 ** 6).toString(),
      label: 'Main Euro',

      balance: Math.round(Math.random() * 10 ** 4),
      transactions: [],
    },
  ],
};

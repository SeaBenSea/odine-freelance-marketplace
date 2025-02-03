import 'jest-extended';
import test from '@playwright/test';
import {
  filterFreelancersByName,
  filterFreelancersByFinishedJobCount,
  filterFreelancersByCity,
} from '../helpers/filterFreelancers';
import users from '../../tests/__fixtures__/users.json';

describe('filterFreelancers', () => {
  const freelancers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    photo: 'mock-photo.jpg',
    finishedJobCount: Math.floor(Math.random() * 10),
    city: user.address.city,
  }));

  describe('filterFreelancersByName', () => {
    test('returns matching freelancer(s) for full names', () => {
      const resultFull = filterFreelancersByName(freelancers, 'John Doe');
      expect(resultFull).toBeArrayOfSize(1);
      expect(resultFull[0].name).toEqual('John Doe');
    });

    test('returns matching freelancer(s) for partial names', () => {
      const resultPartial = filterFreelancersByName(freelancers, 'Jane');
      expect(resultPartial).toBeArrayOfSize(1);
      expect(resultPartial[0].name).toEqual('Jane Smith');
    });

    test('returns an empty array when no freelancer matches', () => {
      const result = filterFreelancersByName(freelancers, 'NonExistent');
      expect(result).toBeEmpty();
    });
  });

  describe('filterFreelancersByFinishedJobCount', () => {
    test('returns freelancers with at least the specified number of finished jobs', () => {
      const result = filterFreelancersByFinishedJobCount(freelancers, 0, 5);
      expect(result).toBeArray();
      expect(result).toSatisfyAll((freelancer) => {
        return freelancer.finishedJobCount >= 0 && freelancer.finishedJobCount <= 5;
      });
    });

    test('returns an empty array when no freelancer matches', () => {
      const result = filterFreelancersByFinishedJobCount(freelancers, 10, 20);
      expect(result).toBeEmpty();
    });
  });

  describe('filterFreelancersByCity', () => {
    test('returns freelancers in the specified city', () => {
      const result = filterFreelancersByCity(freelancers, 'Gwenborough');
      expect(result).toBeArray();
      expect(result).toSatisfyAll((freelancer) => {
        return freelancer.city === 'Gwenborough';
      });
    });

    test('returns an empty array when no freelancer matches', () => {
      const result = filterFreelancersByCity(freelancers, 'NonExistent');
      expect(result).toBeEmpty();
    });
  });
});

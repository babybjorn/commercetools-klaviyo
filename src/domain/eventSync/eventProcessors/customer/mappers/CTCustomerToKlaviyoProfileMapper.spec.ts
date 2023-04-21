import { Customer } from '@commercetools/platform-sdk';
import { getCTCustomerAddressForKlaviyo, getPhoneNumber } from '../utils/CustomerAddressUtils';
import { mapCTCustomerToKlaviyoProfile } from './CTCustomerToKlaviyoProfileMapper';

jest.mock('../utils/CustomerAddressUtils', () => ({
    getCTCustomerAddressForKlaviyo: jest.fn(),
    getPhoneNumber: jest.fn(),
}));

describe('mapCTCustomerToKlaviyoProfile', () => {
    it('maps a simple CT customer object to a Klabiyo profile', () => {
        jest.mocked(getCTCustomerAddressForKlaviyo).mockReturnValue(undefined);
        jest.mocked(getPhoneNumber).mockReturnValue(null);

        const klaviyoProfile = mapCTCustomerToKlaviyoProfile({
            email: 'gareth.john@e2x.com',
            firstName: 'Gareth',
            lastName: 'John',
            title: 'Mr',
            addresses: [],
            companyName: 'some organisation',
            id: 'some-id',
        } as unknown as Customer);

        expect(klaviyoProfile).toEqual({
            email: 'gareth.john@e2x.com',
            external_id: 'some-id',
            first_name: 'Gareth',
            last_name: 'John',
            title: 'Mr',
            phone_number: null,
            organization: 'some organisation',
            location: null,
        });
    });

    it('includes custom fields if present', () => {
        jest.mocked(getCTCustomerAddressForKlaviyo).mockReturnValue(undefined);
        jest.mocked(getPhoneNumber).mockReturnValue(null);

        const klaviyoProfile = mapCTCustomerToKlaviyoProfile({
            email: 'gareth.john@e2x.com',
            firstName: 'Gareth',
            lastName: 'John',
            title: 'Mr',
            addresses: [],
            companyName: 'some organisation',
            id: 'some-id',
            custom: {
                type: {
                    typeId: 'type',
                    id: 'someType'
                },
                fields: {
                    customField1: 'value1',
                    customField2: {
                        nested: 'value',
                    }
                },
            }
        } as unknown as Customer);

        expect(klaviyoProfile).toEqual({
            email: 'gareth.john@e2x.com',
            external_id: 'some-id',
            first_name: 'Gareth',
            last_name: 'John',
            title: 'Mr',
            phone_number: null,
            organization: 'some organisation',
            location: null,
            properties: {
                customField1: 'value1',
                customField2: {
                    nested: 'value',
                }
            },
        });
    });
});

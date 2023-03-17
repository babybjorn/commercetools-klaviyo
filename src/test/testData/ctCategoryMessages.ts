import { CategoryCreatedMessage } from '@commercetools/platform-sdk';

export const sampleCategoryCreatedMessage: CategoryCreatedMessage = {
	id: '38898b94-0070-490d-9c31-22f517a42452',
	version: 1,
	sequenceNumber: 1,
	resource: { typeId: 'category', id: 'cd2cd62b-7f08-44e4-96a8-d3e34c40cac9' },
	resourceVersion: 1,
	resourceUserProvidedIdentifiers: { slug: { en: 'message-trigger-test-11' } },
	type: 'CategoryCreated',
	category: {
		id: 'cd2cd62b-7f08-44e4-96a8-d3e34c40cac9',
		version: 1,
		createdAt: '2023-03-16T15:01:26.922Z',
		lastModifiedAt: '2023-03-16T15:01:26.922Z',
		name: { en: 'MessageTriggerTest1' },
		slug: { en: 'message-trigger-test-11' },
		ancestors: [],
		orderHint: '0.1',
		assets: [],
	},
	createdAt: '2023-03-16T15:01:26.922Z',
	lastModifiedAt: '2023-03-16T15:01:26.922Z',
};

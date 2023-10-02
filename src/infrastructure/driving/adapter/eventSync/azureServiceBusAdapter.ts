import express from 'express';
import { GenericAdapter } from './genericAdapter';
import { processEvent } from '../../../../domain/eventSync/processEvent';
import { MessageDeliveryPayload } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/subscription';
import logger from '../../../../utils/log';
import { KlaviyoSdkService } from '../../../driven/klaviyo/KlaviyoSdkService';

export const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
    if (!req.body) {
        const msg = 'no Azure Service Bus message received';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }
    // check for AZURE Service Bus request
    if (!req.body.message) {
        const msg = 'invalid Azure Service Bus message format';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }

    const payload = req.body.message;
    // logger.info('message = ', message);
    // const payload = message ? JSON.parse(message) : null;
    console.log(payload);
    logger.info('Starting event processing...', payload);
    try {
        // ProcessEvent is the main entry point for the event processing
        const result = await processEvent(payload as MessageDeliveryPayload, new KlaviyoSdkService());
        switch (result.status) {
            case 'OK':
                res.status(204).send();
                break;
            case '4xx':
                res.status(202).send();
                break;
            default:
                res.status(202).send();
                break;
        }
    } catch (e) {
        res.status(500).send();
    }
});

export const azureServiceBusAdapter: GenericAdapter = (): Promise<any> => {
    // start the adapter
    if (process.env.APP_TYPE && process.env.APP_TYPE != 'EVENT') {
        return Promise.resolve();
    }
    const PORT = process.env.PUB_SUB_PORT || 6789;
    app.listen(PORT, () =>
        logger.info(`klaviyo commercetools plugin Azure Service Bus adapter, listening on port ${PORT}`),
    );
    return Promise.resolve(app);
};

//     The plugin supports out of the box GCP Pub/Sub, to use a different message queue (AWS Eventbridge, AWS SNS, Azure
//     Service Bus...) the plugin needs some code change.
//     The existing GCP Pub/Sub queue adapter can be found in `src/infrastructure/driving/adapter/eventSync/pubsubAdapter.ts`,
//     it is also provided an example for AWS SQS `src/infrastructure/driving/adapter/eventSync/sqsAdapter.ts`.
//     Check your selected message queue documentation to learn how the message should be consumed (e.g. push/pull) and the
//     format of the payload received.
//     Once the code to get the message from the queue is ready call the `processEvent` method with the message payload,
//     optionally the method accepts the list of eventProcessors that can be overridden to remove or add new event processors.

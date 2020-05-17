// import { withData } from 'next-apollo'
// import { HttpLink } from 'apollo-boost'

// const port = 3000;
// const host = 'http';
// const domain = process.browser !== 'undefined' ? `raspberrypi.local:${port}` : `localhost:${port}`;

// const httpLink = new HttpLink({
//     mode: 'no-cors',
//     credentials: 'omit', // Additional fetch() options like `credentials` or `headers`
//     uri: `${host}://${domain}/api/graphql`, // Server URL
// });

// // // can also be a function that accepts a `context` object (SSR only) and returns a config
// const config = {
//     link: httpLink
// }

// export default withData(config);
// // export default withData(headers => {
// //     const httpLink = new HttpLink({
// //         uri: `${host}://${domain}/api/graphql`, // Server URL
// //         // this goes here directly (there's actually no "opts" config)
// //         credentials: 'same-origin',
// //         // resend the headers on the server side, to be truly isomorphic (makes authentication possible)
// //         headers
// //     });

// //     return {
// //         link: process.browser
// //             ? split(
// //                 ({ query }) => {
// //                     const { kind, operation } = getMainDefinition(query);

// //                     return 'OperationDefinition' === kind && 'subscription' === operation;
// //                 },
// //                 // that's all you need to make subscriptions work :)
// //                 new WebSocketLink({
// //                     uri: `ws://${domain}/subscriptions`,
// //                     options: { reconnect: true }
// //                 }),
// //                 httpLink
// //             )
// //             : httpLink
// //     };
// // });
import '@babel/polyfill'
import 'isomorphic-fetch';
import Shopify, {ApiVersion} from '@shopify/shopify-api';
import dotenv from 'dotenv';

dotenv.config();

/*'TODO: 'FIXME:
This file should be an api but it needs completely reworking or removing
*/

const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET } = process.env;

// server.keys = [SHOPIFY_API_SECRET || "" ];

// // server.use(
// //   createShopifyAuth({
// //     accessMode: 'offline',
// //     authPath: 'install/auth',
// //     async afterAuth(ctx) {
// //       const { shop, accessToken } = ctx.state.shopify;
// //       const {host } = ctx.query;
// //       if(!accessToken) {
// //         ctx.response.status = 500;
// //         ctx.response.body = 'Failed to get access token! Please try again.';
// //         return;
// //       }
// //       ctx.redirect(`./auth?shop=${shop}&host=${host}`);
// //     },
// //   })
// // );

// // //User auth route (fget online session token)
// // server.use(
// //   createShopifyAuth({
// //     accessMode: 'online',
// //     authPath: 'auth',
// //     async afterAuth(ctx) {
// //       const { shop } = ctx.state.shopify;
// //       const {host } = ctx.query;
// //       //check if the app is installed
// //       if(isShopActive(shop)) {
// //         ctx.response.status = 500;
// //         ctx.response.body = 'Failed to get shop! Please try again.';
// //         return;

// //   })
// //     apiKey: SHOPIFY_API_KEY,
// //     secret: SHOPIFY_API_SECRET,
// //     scopes: ['read_products', 'write_products'],
// //     afterAuth(ctx) {
// //       const { shop, accessToken } = ctx.session;
// //       console.log('Authenticated:', shop, accessToken);
// //       ctx.redirect('/');
// //     },
// //   })
// // );

// // server.listen(3000, () => {
// //   console.log('Server is listening on port 3000');
// // });

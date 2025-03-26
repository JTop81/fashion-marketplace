import {
  ACTIVITY_ID_PARAM,
  CHAT_ID_PARAM,
  MESSAGE_ID,
  POST_ID_PARAM,
  POST_STATUS,
  POST_TYPE,
  PREFERENCE_ID,
  ROLE_PARAM,
  SESSION_ID,
  STORE_ID_PARAM,
  USER_ID_PARAM,
  USER_ROLE_ID,
} from "./route-params.constants";

export const BASE_API_URL = process.env.REACT_APP_API_URL;
export const BASE_URL =
  process.env.REACT_APP_VERCEL_ENV === "preview"
    ? process.env.REACT_APP_VERCEL_URL
    : process.env.REACT_APP_BASE_URL;

export const ANALYTICS_ORDERS_URL = `${BASE_API_URL}/users/id/analytics/orders`;
export const CHATS_URL = `${BASE_API_URL}/user/chats`;
export const CHAT_MESSAGES_URL = `${BASE_API_URL}/user/:${CHAT_ID_PARAM}/messages`;
export const CHAT_URL = `${BASE_API_URL}/user/chats/:${CHAT_ID_PARAM}`;

export const CONTACTS_URL = `${BASE_API_URL}/seller/contacts`;
export const CATEGORIES_URL = `${BASE_API_URL}/:${ROLE_PARAM}/customize`;
export const ORDERS_URL = `${BASE_API_URL}/users/id/orders`;
export const GET_POSTS_URL = `${BASE_API_URL}/posts`;
export const CREATE_POST_URL = `${BASE_API_URL}/posts/:${POST_TYPE}/:${POST_STATUS}`;
export const DELETE_POST_URL = `${BASE_API_URL}/posts/:${POST_ID_PARAM}`;
export const UPDATE_POST_URL = `${BASE_API_URL}/posts/:${POST_ID_PARAM}`;
export const POSTS_ACTIVITIES_URL = `${BASE_API_URL}/post/activities/`;
export const DELETE_POSTS_ACTIVITIES_URL = `${BASE_API_URL}/posts/activities/:${ACTIVITY_ID_PARAM}`;

export const GET_POST_ACTIVITIES_URL = `${BASE_API_URL}/post/activities/`;
export const GET_ALL_PREFERENCES = `${BASE_API_URL}/preferences`;

export const STORE_FRONT_GET_PER_USER = `${BASE_API_URL}/users/roles`;
export const UPDATE_USER_INFO = `${BASE_API_URL}/users/roles/:${USER_ROLE_ID}`;
// Use a simple placeholder like `:id`

export const SELLER_PROFILE_EARNING_URL = `${BASE_API_URL}/seller/profile/earning`;
export const SELLER_PROFILE_AVAILABLE_FUNDS_URL = `${BASE_API_URL}/seller/profile/available-funds`;
export const SELLER_PROFILE_BRANDINFO_URL = `${BASE_API_URL}/seller/profile/brand-info`;
export const SELLER_PROFILE_SELLERINFO_URL = `${BASE_API_URL}/seller/profile/seller-info`;
export const SELLER_PROFILE_CATEGORIES_URL = `${BASE_API_URL}/seller/profile/categories`;

export const BUYER_PROFILE_SHOPPER_INFO = `${BASE_API_URL}/buyer/profile/shopper-info`;
export const BUYER_PROFILE_CONTACT_INFO = `${BASE_API_URL}/buyer/profile/contact-info`;
export const BUYER_PROFILE_SHIPPING_ADDRESS = `${BASE_API_URL}/buyer/profile/shipping-address`;
export const BUYER_PROFILE_PREFERENCES = `${BASE_API_URL}/buyer/profile/preferences`;
export const BUYER_PROFILE_CATEGORY_LIST = `${BASE_API_URL}/buyer/profile/category-list`;

export const USER_ME = `/users/me`;
export const USER_INIT = `/users/init`;
export const GETPRESIGNEDURL = `${BASE_API_URL}/assets/presigned-url`;
export const RECORDASSET = `${BASE_API_URL}/assets`;
export const ATTACH_ROLE_TO_USER = `${BASE_API_URL}/users/:${USER_ID_PARAM}/roles`;
export const ATTACH_OPTIONS_TO_USER = `${BASE_API_URL}/preferences/options`;
export const GET_USER_OPTIONS = `${BASE_API_URL}/preferences/options`;
export const UPDATE_USER_ROLE_OPTIONS = `${BASE_API_URL}/preferences/:${PREFERENCE_ID}/options`;
export const UPDATE_USER = `${BASE_API_URL}/users/:${USER_ID_PARAM}`;
export const GET_ROLES = `${BASE_API_URL}/roles`;

export const NOTIFICATIONS_URL = `${BASE_API_URL}/notifications`;

export const BUYER_FOLLOW = `${BASE_API_URL}/followers`;
export const STATS_STORE_URL = `${BASE_API_URL}/storefront/:${STORE_ID_PARAM}/stats`;
export const GET_HISTORICAL_SEARCHES = `${BASE_API_URL}/ai/search/history`;
export const GET_FEEDS = `${BASE_API_URL}/ai/search/messages/:${MESSAGE_ID}/feeds`;
export const GET_MESSAGES = `${BASE_API_URL}/ai/search/session/:${SESSION_ID}/messages`;
export const POST_MESSAGES = `${BASE_API_URL}/ai/search/messages`;
export const DELETE_SESSION = `${BASE_API_URL}/ai/search/sessions/:${SESSION_ID}`;
export const DELETE_ALL_SESSIONS = `${BASE_API_URL}/ai/search/sessions`;
export const CREATE_SESSION = `${BASE_API_URL}/ai/search/sessions`;

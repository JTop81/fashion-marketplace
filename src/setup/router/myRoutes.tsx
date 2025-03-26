import { Route, Routes } from "react-router-dom";
import { Role } from "enums/role";

import BuyerFeeds from "pages/buyer-home/feeds";
import Error500 from "pages/Error500";
import NotFound from "pages/not-found-page";
import { NotificationsPage } from "pages/notifications-page";
import SettingSelector from "pages/profile-selector";
import { MyPosts } from "pages/seller-home";
import ExternalCreate from "pages/seller-home/post-create/ExternalCreate";
import ProductCreate from "pages/seller-home/post-create/ProductCreate";
import StoreFront from "pages/seller-home/store-front";
import SupportPage from "pages/support-page";

import HomeSelector from "../../pages/home-selector";

import { ProtectedRoute } from "./ProtectedRoute";

export const MyRoutes = () => {
  return (
    <Routes>
      {/* Error Routes */}
      <Route
        path="/500"
        element={
          <ProtectedRoute roles={[Role.PUBLIC]}>
            <Error500 />
          </ProtectedRoute>
        }
      />

      {/* Auth Routes */}
      <Route
        path="shopper/feeds"
        element={
          <ProtectedRoute roles={[Role.SHOPPER, Role.ADMIN]}>
            <BuyerFeeds />
          </ProtectedRoute>
        }
      />
      <Route
        path="notifications"
        element={
          <ProtectedRoute
            roles={[
              Role.PUBLIC,
              Role.SHOPPER,
              Role.BOUTIQUE,
              Role.BRAND,
              Role.ADMIN,
            ]}
          >
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute
            roles={[
              Role.PUBLIC,
              Role.UNASSIGNED,
              Role.BRAND,
              Role.BOUTIQUE,
              Role.SHOPPER,
              Role.ADMIN,
            ]}
          >
            <HomeSelector />
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute
            roles={[
              Role.PUBLIC,
              Role.UNASSIGNED,
              Role.BRAND,
              Role.BOUTIQUE,
              Role.SHOPPER,
              Role.ADMIN,
            ]}
          >
            <SupportPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute
            roles={[
              Role.PUBLIC,
              Role.UNASSIGNED,
              Role.BRAND,
              Role.BOUTIQUE,
              Role.SHOPPER,
              Role.ADMIN,
            ]}
          >
            <SettingSelector />
          </ProtectedRoute>
        }
      />
      <Route
        path="product/:id"
        element={
          <ProtectedRoute
            roles={[Role.BOUTIQUE, Role.BRAND, Role.SHOPPER, Role.ADMIN]}
          >
            <ProductCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="external/:id"
        element={
          <ProtectedRoute
            roles={[Role.BOUTIQUE, Role.BRAND, Role.SHOPPER, Role.ADMIN]}
          >
            <ExternalCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="product/create"
        element={
          <ProtectedRoute
            roles={[Role.BOUTIQUE, Role.BRAND, Role.SHOPPER, Role.ADMIN]}
          >
            <ProductCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="external/create"
        element={
          <ProtectedRoute
            roles={[Role.BOUTIQUE, Role.BRAND, Role.SHOPPER, Role.ADMIN]}
          >
            <ExternalCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="ai_search_messages/:ai_search_message_id"
        element={
          <ProtectedRoute roles={[Role.SHOPPER, Role.ADMIN]}>
            <BuyerFeeds />
          </ProtectedRoute>
        }
      />

      {/* Buyer Routes */}
      {/* <Route
          path="chat"
          element={
            <ProtectedRoute roles={[Role.PUBLIC, Role.SHOPPER, Role.ADMIN]}>
              <ChatPage role={Role.SHOPPER} />
            </ProtectedRoute>
          }
        >
          <Route
            path=":chatId"
            element={
              <ProtectedRoute roles={[Role.PUBLIC, Role.SHOPPER, Role.ADMIN]}>
                <ChatPage role={Role.SHOPPER} />
              </ProtectedRoute>
            }
          />
        </Route> */}

      {/* <Route
          path="cart"
          element={
            <ProtectedRoute roles={[Role.PUBLIC, Role.SHOPPER, Role.ADMIN]}>
              <Cart />
            </ProtectedRoute>
          }
        /> */}

      {/* Seller Routes */}
      <Route
        path="seller/posts"
        element={
          <ProtectedRoute roles={[Role.BOUTIQUE, Role.BRAND, Role.ADMIN]}>
            <MyPosts />
          </ProtectedRoute>
        }
      />
      {/* <Route
          path="orders"
          element={
            <ProtectedRoute
              roles={[Role.PUBLIC, Role.BOUTIQUE, Role.BRAND, Role.ADMIN]}
            >
              <SellerOrders />
            </ProtectedRoute>
          }
        /> */}
      {/* <Route
          path="notifications"
          element={
            <ProtectedRoute
              roles={[Role.PUBLIC, Role.BOUTIQUE, Role.BRAND, Role.ADMIN]}
            >
              <NotificationsPage />
            </ProtectedRoute>
          }
        /> */}
      <Route
        path="store-front/:id"
        element={
          <ProtectedRoute
            roles={[Role.BRAND, Role.BOUTIQUE, Role.SHOPPER, Role.ADMIN]}
          >
            <StoreFront />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute roles={[Role.PUBLIC]}>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

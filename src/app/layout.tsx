'use client';

import React from 'react';
import './globals.css';
import StyledComponentsRegistry from '../lib/registry';
import { ShopProvider } from '../context/ShopContext';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from '../theme/muiTheme';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { CheckoutModal } from '../components/CheckoutModal';
import { OrderTrackerModal } from '../components/OrderTrackerModal';
import { UserDashboardModal } from '../components/UserDashboardModal';
import { AdminPortalModal } from '../components/AdminPortalModal';
import { SearchModal } from '../components/SearchModal';
import { AiStyleAssistant } from '../components/AiStyleAssistant';
import { VipDiscountModal } from '../components/VipDiscountModal';
import { RoyaltyLoyaltyModal } from '../components/RoyaltyLoyaltyModal';
import { Preloader } from '../components/Preloader';
import { ContentProtection } from '../components/ContentProtection';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>RICHEEKAY FASHION EMPIRE | Luxury Ladies' Fashion & Couture</title>
        <meta
          name="description"
          content="RICHEEKAY FASHION EMPIRE is a premium international fashion brand specializing in luxury ladies fashion, bespoke native Aso-Ebi wear, Senator materials, heels, handbags, and 100% virgin wigs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/botlogo.png?v=3" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/botlogo.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/botlogo.png?v=3" />
      </head>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <ShopProvider>
            <Preloader />
            <ContentProtection />
            <ThemeProvider theme={muiTheme}>
              <Navbar />
              <main>{children}</main>
              <Footer />

              {/* Global Interactive Drawers & Modals */}
              <CartDrawer />
              <ProductQuickViewModal />
              <CheckoutModal />
              <OrderTrackerModal />
              <UserDashboardModal />
              <AdminPortalModal />
              <SearchModal />
              <VipDiscountModal />
              <RoyaltyLoyaltyModal />

              {/* Floating VIP AI Assistant */}
              <AiStyleAssistant />
            </ThemeProvider>
          </ShopProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

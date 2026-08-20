'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { Dialog, DialogContent, Stepper, Step, StepLabel, Box } from '@mui/material';
import { FiCheckCircle, FiShield, FiCreditCard, FiLock, FiDownload, FiArrowRight, FiPrinter, FiX } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
  background: #141414;
  color: #ffffff;
  border: 1px solid #d4af37;
  border-radius: 8px;
  position: relative;
  padding: 28px;

  h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.8rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 20px;

    span {
      color: #d4af37;
    }
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;

    label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #d4af37;
      text-transform: uppercase;
    }

    input, select {
      background: #0a0a0a;
      border: 1px solid rgba(212, 175, 55, 0.4);
      color: #ffffff;
      padding: 12px 14px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;

      &:focus {
        outline: none;
        border-color: #d4af37;
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
      }
    }
  }

  .payment-card {
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 16px;
    margin-bottom: 12px;
    background: #0a0a0a;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.selected {
      border-color: #d4af37;
      background: rgba(212, 175, 55, 0.1);
    }
  }

  .action-btn {
    width: 100%;
    background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
    color: #0a0a0a;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 14px 0;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover {
      background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
    }
  }
`;

const InvoiceCard = styled.div`
  background: #0a0a0a;
  border: 1px solid #d4af37;
  padding: 24px;
  text-align: center;
  margin-top: 10px;

  .order-id {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.8rem;
    color: #d4af37;
    margin: 10px 0;
  }

  .details-box {
    background: #1f1f1f;
    padding: 16px;
    margin: 16px 0;
    text-align: left;
    font-size: 0.85rem;
    color: #dddddd;
  }
`;

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotalNGN,
    formatPrice,
    createOrder,
    setIsOrderTrackerOpen
  } = useShop();

  const [activeStep, setActiveStep] = useState(0);
  const [customerName, setCustomerName] = useState('Lady Chief Elizabeth');
  const [customerPhone, setCustomerPhone] = useState('+234 000 000 0000');
  const [customerEmail, setCustomerEmail] = useState('elizabeth@luxuryfashion.com');
  const [address, setAddress] = useState('Plot 14, Victoria Island, Lagos, Nigeria');
  const [paymentMethod, setPaymentMethod] = useState('Paystack Gateway (Cards, Transfer, USSD)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  const steps = ['Shipping Details', 'Delivery Method', 'Payment Gateway', 'Order Confirmation'];

  const handleNextStep = () => {
    if (activeStep === 2) {
      // Simulate Paystack payment popup processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const order = createOrder({
          name: customerName,
          phone: customerPhone,
          address,
          method: paymentMethod
        });
        setCreatedOrder(order);
        setActiveStep(3);

        // Fire festive luxury celebration confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F4E798', '#FFFFFF', '#C9A227']
        });
      }, 2000);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const safeClose = useSafeCloseModal();

  const handleClose = () => {
    safeClose(() => {
      setIsCheckoutOpen(false);
      setActiveStep(0);
      setCreatedOrder(null);
    });
  };

  return (
    <Dialog
      open={isCheckoutOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          style: {
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            overflow: 'visible'
          }
        }
      }}
    >
      <DialogContent style={{ padding: 0 }}>
        <CheckoutContainer>
          <button
            onClick={handleClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#D4AF37', fontSize: '1.5rem', cursor: 'pointer', zIndex: 10 }}
          >
            <FiX />
          </button>
          <h2>
            RICHEEKAY <span>LUXURY CHECKOUT</span>
          </h2>

          <Box sx={{ width: '100%', marginBottom: '28px' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': { color: '#AAAAAA', fontFamily: 'Montserrat, sans-serif' },
                      '& .Mui-active': { color: '#D4AF37 !important' },
                      '& .Mui-completed': { color: '#D4AF37 !important' }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {activeStep === 0 && (
            <div>
              <div className="grid-2">
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address for E-Receipt</label>
                <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
              </div>

              <div className="input-group">
                <label>Delivery Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>

              <button className="action-btn" onClick={handleNextStep}>
                Continue to Delivery Method <FiArrowRight />
              </button>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <h4 style={{ color: '#D4AF37', marginBottom: '14px' }}>Select Delivery Courier</h4>
              <div className="payment-card selected">
                <div>
                  <strong>Express Courier Delivery</strong>
                  <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Lagos, Oyo & Osogbo (Osun State) Doorstep Delivery in Premium Gold Gift Box</p>
                </div>
                <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>Included</span>
              </div>

              <div className="payment-card">
                <div>
                  <strong>VIP In-Store Fitting & Pickup</strong>
                  <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Flagship Boutique: Plot 14 Victoria Island, Lagos</p>
                </div>
                <span>Free</span>
              </div>

              <button className="action-btn" onClick={handleNextStep}>
                Proceed to Payment <FiArrowRight />
              </button>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <h4 style={{ color: '#D4AF37', marginBottom: '14px' }}>Select Secure Payment Gateway</h4>

              <div
                className={`payment-card ${paymentMethod.includes('Paystack') ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('Paystack Gateway (Cards, Transfer, USSD)')}
              >
                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiShield style={{ color: '#D4AF37' }} /> Paystack Gateway (Recommended)
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Pay with Visa, Mastercard, Verve, Direct Bank Transfer, or Apple Pay</p>
                </div>
              </div>

              <div
                className={`payment-card ${paymentMethod.includes('Flutterwave') ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('Flutterwave Gateway (Multi-Currency)')}
              >
                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiCreditCard style={{ color: '#D4AF37' }} /> Flutterwave Global Payment
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Supports International Cards (USD, GBP, EUR, NGN)</p>
                </div>
              </div>

              <div
                className={`payment-card ${paymentMethod.includes('Bank Transfer') ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('Direct Bank Transfer (RICHEEKAY Zenith Bank)')}
              >
                <div>
                  <strong>Direct Bank Transfer</strong>
                  <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Transfer directly to RICHEEKAY FASHION EMPIRE corporate account</p>
                </div>
              </div>

              <div style={{ margin: '16px 0', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  <span>Total Payable:</span>
                  <span style={{ color: '#D4AF37' }}>{formatPrice(cartTotalNGN)}</span>
                </div>
              </div>

              <button className="action-btn" onClick={handleNextStep} disabled={isProcessing}>
                {isProcessing ? (
                  <span>
                    <FiLock /> Encrypting & Processing Payment...
                  </span>
                ) : (
                  <span>
                    <FiLock /> Pay {formatPrice(cartTotalNGN)} Now
                  </span>
                )}
              </button>
            </div>
          )}

          {activeStep === 3 && createdOrder && (
            <InvoiceCard>
              <FiCheckCircle style={{ fontSize: '3.5rem', color: '#D4AF37', marginBottom: '10px' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#FFFFFF' }}>Payment Successful & Order Placed!</h3>
              <p style={{ color: '#AAAAAA', fontSize: '0.9rem' }}>Thank you for shopping with RICHEEKAY FASHION EMPIRE.</p>

              <div className="order-id">Order ID: #{createdOrder.id}</div>

              <div className="details-box">
                <p>
                  <strong>Customer:</strong> {createdOrder.customerName} ({createdOrder.customerPhone})
                </p>
                <p>
                  <strong>Delivery Address:</strong> {createdOrder.shippingAddress}
                </p>
                <p>
                  <strong>Total Paid:</strong> {formatPrice(createdOrder.totalNGN)} ({createdOrder.paymentMethod})
                </p>
                <p>
                  <strong>Current Status:</strong> <span style={{ color: '#D4AF37', fontWeight: 600 }}>{createdOrder.status}</span>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  className="action-btn"
                  style={{ width: 'auto', padding: '12px 24px' }}
                  onClick={() => {
                    handleClose();
                    setIsOrderTrackerOpen(true);
                  }}
                >
                  Track Order Live
                </button>
                <button
                  className="action-btn"
                  style={{ width: 'auto', padding: '12px 24px', background: '#1F1F1F', color: '#D4AF37', border: '1px solid #D4AF37' }}
                  onClick={() => window.print()}
                >
                  <FiPrinter /> Print E-Receipt
                </button>
              </div>
            </InvoiceCard>
          )}
        </CheckoutContainer>
      </DialogContent>
    </Dialog>
  );
};

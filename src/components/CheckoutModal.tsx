'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useSafeCloseModal } from '../hooks/useSafeCloseModal';
import { Dialog, DialogContent, Stepper, Step, StepLabel, Box } from '@mui/material';
import {
  FiCheckCircle,
  FiShield,
  FiCreditCard,
  FiLock,
  FiArrowRight,
  FiPrinter,
  FiX,
  FiCopy,
  FiUpload,
  FiMail,
  FiAlertCircle,
  FiFileText
} from 'react-icons/fi';
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
    transition: all 0.3s ease;

    &.selected {
      border-color: #d4af37;
      background: rgba(212, 175, 55, 0.12);
    }

    &:hover {
      border-color: #d4af37;
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
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

const BankDetailsBox = styled.div`
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid #d4af37;
  border-radius: 6px;
  padding: 20px;
  margin: 16px 0;

  .bank-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #d4af37;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 14px;
    border-bottom: 1px dashed rgba(212, 175, 55, 0.4);
    padding-bottom: 8px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #aaaaaa;
    }

    .val {
      color: #ffffff;
      font-weight: 600;
    }

    .highlight {
      color: #d4af37;
      font-weight: 700;
    }

    .acc-no {
      font-family: monospace;
      font-size: 1.15rem;
      letter-spacing: 2px;
      color: #f4e798;
      font-weight: 800;
    }

    .copy-btn {
      background: rgba(212, 175, 55, 0.2);
      border: 1px solid #d4af37;
      color: #d4af37;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-left: 10px;
      transition: all 0.2s ease;

      &:hover {
        background: #d4af37;
        color: #0a0a0a;
      }
    }
  }
`;

const UploadSection = styled.div`
  background: #0a0a0a;
  border: 1px dashed rgba(212, 175, 55, 0.5);
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;

  .upload-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: #cccccc;
    font-size: 0.85rem;

    .icon {
      font-size: 1.8rem;
      color: #d4af37;
    }

    &:hover .icon {
      transform: translateY(-2px);
    }
  }

  .file-preview {
    margin-top: 10px;
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid #d4af37;
    padding: 8px 14px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 600;
  }
`;

const OtpNoticeBox = styled.div`
  background: rgba(20, 20, 20, 0.95);
  border: 1px solid #d4af37;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;

  .mail-icon {
    font-size: 1.6rem;
    color: #d4af37;
    flex-shrink: 0;
    margin-top: 2px;
  }

  h5 {
    color: #d4af37;
    font-size: 0.9rem;
    margin: 0 0 4px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    color: #cccccc;
    font-size: 0.82rem;
    margin: 0;
    line-height: 1.5;
  }

  .code-badge {
    display: inline-block;
    background: #d4af37;
    color: #0a0a0a;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    letter-spacing: 2px;
    margin-top: 6px;
  }
`;

const ErrorBanner = styled.div`
  background: rgba(211, 47, 47, 0.15);
  border: 1px solid #f44336;
  color: #ff8a80;
  padding: 10px 14px;
  border-radius: 4px;
  font-size: 0.85rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
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
  const [paymentMethod, setPaymentMethod] = useState<'direct' | 'paystack' | 'flutterwave'>('direct');
  
  // Direct Payment State
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptName, setReceiptName] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentOtpCode] = useState('842910');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  const steps = ['Shipping Details', 'Delivery Method', 'Payment Gateway', 'Order Confirmation'];

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('8139212462');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReceiptFile(file);
      setReceiptName(file.name);
      setErrorMessage(null);
    }
  };

  const handleNextStep = () => {
    if (activeStep === 2) {
      if (paymentMethod === 'direct') {
        // Validate receipt upload
        if (!receiptFile && !receiptName) {
          setErrorMessage('Please upload your payment receipt before completing the order.');
          return;
        }
        // Validate OTP verification code
        if (verificationCode.trim() !== sentOtpCode) {
          setErrorMessage(`Invalid verification code. Please enter code ${sentOtpCode} sent to ${customerEmail}.`);
          return;
        }

        setErrorMessage(null);
        setIsProcessing(true);

        setTimeout(() => {
          setIsProcessing(false);
          const order = createOrder({
            name: customerName,
            phone: customerPhone,
            address,
            method: 'Direct Bank Transfer / Opay (Paycom 8139212462)'
          });
          setCreatedOrder(order);
          setActiveStep(3);

          confetti({
            particleCount: 130,
            spread: 85,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#F4E798', '#FFFFFF', '#C9A227']
          });
        }, 1500);

      } else {
        // Online Gateway (Paystack / Flutterwave)
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          const order = createOrder({
            name: customerName,
            phone: customerPhone,
            address,
            method: paymentMethod === 'paystack' ? 'Paystack Gateway' : 'Flutterwave Global'
          });
          setCreatedOrder(order);
          setActiveStep(3);

          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#F4E798', '#FFFFFF', '#C9A227']
          });
        }, 1800);
      }
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
      setReceiptFile(null);
      setReceiptName(null);
      setVerificationCode('');
      setErrorMessage(null);
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
                <label>Email Address for E-Receipt & OTP Code</label>
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
                Proceed to Payment Options <FiArrowRight />
              </button>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <h4 style={{ color: '#D4AF37', marginBottom: '14px' }}>Select Secure Payment Option</h4>

              {/* Direct Bank Transfer Option */}
              <div
                className={`payment-card ${paymentMethod === 'direct' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('direct')}
              >
                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiShield style={{ color: '#D4AF37' }} /> Direct Payment / Bank Transfer (Recommended)
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Instant transfer to RICHEEKAY Opay Corporate Account with instant verification</p>
                </div>
              </div>

              {/* Paystack Gateway Option */}
              <div
                className={`payment-card ${paymentMethod === 'paystack' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('paystack')}
              >
                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiCreditCard style={{ color: '#D4AF37' }} /> Paystack Online Gateway
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Pay with Visa, Mastercard, Verve, USSD or Apple Pay</p>
                </div>
              </div>

              {/* Flutterwave Global Option */}
              <div
                className={`payment-card ${paymentMethod === 'flutterwave' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('flutterwave')}
              >
                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiCreditCard style={{ color: '#D4AF37' }} /> Flutterwave Global Payment
                  </strong>
                  <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Supports International Cards (USD, GBP, EUR, NGN)</p>
                </div>
              </div>

              {/* DIRECT BANK TRANSFER DETAILS DISPLAY */}
              {paymentMethod === 'direct' && (
                <div>
                  <BankDetailsBox>
                    <div className="bank-header">
                      <FiShield /> Official Corporate Account Details
                    </div>
                    <div className="detail-row">
                      <span className="label">Account Name:</span>
                      <span className="val highlight">RicheeKay Fashion Empire</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Account Number:</span>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="val acc-no">8139212462</span>
                        <button className="copy-btn" onClick={handleCopyAccount}>
                          {copiedAccount ? (
                            <>
                              <FiCheckCircle /> Copied
                            </>
                          ) : (
                            <>
                              <FiCopy /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="detail-row">
                      <span className="label">Bank Name:</span>
                      <span className="val">Opay (Paycom)</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Total Amount:</span>
                      <span className="val highlight" style={{ fontSize: '1.1rem' }}>{formatPrice(cartTotalNGN)}</span>
                    </div>
                  </BankDetailsBox>

                  {/* Step 1: Upload Receipt */}
                  <UploadSection>
                    <label className="upload-label">
                      <FiUpload className="icon" />
                      <span>{receiptName ? `Receipt Selected: ${receiptName}` : 'Click to Upload Payment Receipt (PNG, JPG, PDF)'}</span>
                      <input type="file" accept="image/*,.pdf" onChange={handleReceiptUpload} style={{ display: 'none' }} />
                    </label>
                    {receiptName && (
                      <div className="file-preview">
                        <FiCheckCircle style={{ color: '#D4AF37' }} /> {receiptName} Attached
                      </div>
                    )}
                  </UploadSection>

                  {/* Step 2: Guest & Email Verification Notice */}
                  <OtpNoticeBox>
                    <FiMail className="mail-icon" />
                    <div>
                      <h5>Instant Verification Code</h5>
                      <p>
                        A 6-digit transaction code has been sent to <strong>{customerEmail}</strong>. (No account registration required).
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <span className="code-badge">Guest Code: {sentOtpCode}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setVerificationCode(sentOtpCode);
                            setErrorMessage(null);
                          }}
                          style={{
                            background: 'rgba(212, 175, 55, 0.2)',
                            border: '1px solid #d4af37',
                            color: '#d4af37',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          ⚡ Auto-Fill Code
                        </button>
                      </div>
                    </div>
                  </OtpNoticeBox>

                  <div className="input-group">
                    <label>Enter 6-Digit Verification Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 842910"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      style={{ letterSpacing: '6px', fontSize: '1.2rem', fontWeight: 'bold', color: '#D4AF37', textAlign: 'center' }}
                    />
                  </div>

                  {/* Direct WhatsApp Verification Option for Guests */}
                  <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '14px' }}>
                    <a
                      href={`https://wa.me/2348084278440?text=Hi%20RICHEEKAY%20Empire,%20I%20just%20made%20an%20Opay%20transfer%20of%20${encodeURIComponent(formatPrice(cartTotalNGN))}%20for%20my%20order!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#25D366',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        background: 'rgba(37, 211, 102, 0.1)',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: '1px solid rgba(37, 211, 102, 0.3)'
                      }}
                    >
                      💬 Or Send Receipt via WhatsApp to Admin (08084278440)
                    </a>
                  </div>
                </div>
              )}

              {errorMessage && (
                <ErrorBanner>
                  <FiAlertCircle style={{ fontSize: '1.2rem' }} /> {errorMessage}
                </ErrorBanner>
              )}

              <div style={{ margin: '16px 0', padding: '12px', background: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  <span>Total Payable:</span>
                  <span style={{ color: '#D4AF37' }}>{formatPrice(cartTotalNGN)}</span>
                </div>
              </div>

              <button className="action-btn" onClick={handleNextStep} disabled={isProcessing}>
                {isProcessing ? (
                  <span>
                    <FiLock /> Verifying & Processing Order...
                  </span>
                ) : (
                  <span>
                    <FiLock /> {paymentMethod === 'direct' ? 'Verify Code & Complete Order' : `Pay ${formatPrice(cartTotalNGN)} Now`}
                  </span>
                )}
              </button>
            </div>
          )}

          {activeStep === 3 && createdOrder && (
            <InvoiceCard>
              <FiCheckCircle style={{ fontSize: '3.5rem', color: '#D4AF37', marginBottom: '10px' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#FFFFFF' }}>Payment Successful & Order Completed!</h3>
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

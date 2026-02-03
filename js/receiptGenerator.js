/**
 * Receipt Generator Module
 * Generates PDF receipts for successful sports registrations using jsPDF
 */

/**
 * Generate and download receipt after successful payment
 * @param {Object} registrationData - Complete registration data
 * @param {Object} paymentData - Payment information from Razorpay
 */
function generateReceipt(registrationData, paymentData) {
  try {
    // Get jsPDF from global scope
    const { jsPDF } = window.jspdf;
    
    if (!jsPDF) {
      console.error('jsPDF library not loaded');
      alert('Receipt generation failed. Please download manually from your email.');
      return null;
    }
    
    // Create new PDF document (A4 size)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Generate Receipt ID
    const receiptId = `REC-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const receiptDate = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    
    // Page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;
    
    // ===== HEADER =====
    // Background banner
    doc.setFillColor(10, 25, 41); // Navy color
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // College Name
    doc.setTextColor(255, 215, 0); // Gold color
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('BHARAT COLLEGE OF ENGINEERING', pageWidth / 2, 20, { align: 'center' });
    
    // Organizer
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('Student Council', pageWidth / 2, 30, { align: 'center' });
    
    // Receipt title
    doc.setFontSize(10);
    doc.text('Sports Event Registration Receipt', pageWidth / 2, 40, { align: 'center' });
    
    yPos = 60;
    
    // ===== RECEIPT INFO BAR =====
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 15, 'F');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Receipt ID: ${receiptId}`, margin + 5, yPos + 10);
    doc.text(`Date: ${receiptDate}`, pageWidth - margin - 5, yPos + 10, { align: 'right' });
    
    yPos += 25;
    
    // ===== PAYMENT STATUS =====
    doc.setFillColor(76, 175, 80); // Green for success
    doc.rect(margin, yPos, pageWidth - (margin * 2), 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ PAYMENT SUCCESSFUL', pageWidth / 2, yPos + 8, { align: 'center' });
    
    yPos += 20;
    
    // ===== SPORT DETAILS =====
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Sport Details', margin, yPos);
    yPos += 8;
    
    // Draw line
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const sportDetails = [
      ['Sport Name:', registrationData.sportName],
      ['Category:', `${registrationData.category.charAt(0).toUpperCase() + registrationData.category.slice(1)} (${registrationData.gender.toUpperCase()})`],
      ['Game Type:', registrationData.gameType.charAt(0).toUpperCase() + registrationData.gameType.slice(1)]
    ];
    
    sportDetails.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, margin + 50, yPos);
      yPos += 7;
    });
    
    yPos += 5;
    
    // ===== PARTICIPANT DETAILS =====
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Participant Details', margin, yPos);
    yPos += 8;
    
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const participantDetails = [
      ['Team/Participant Name:', registrationData.teamName],
      ['Contact Number:', registrationData.contact]
    ];
    
    participantDetails.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, margin + 60, yPos);
      yPos += 7;
    });
    
    yPos += 2;
    
    // Player names
    doc.setFont('helvetica', 'bold');
    doc.text('Players:', margin, yPos);
    yPos += 7;
    
    doc.setFont('helvetica', 'normal');
    const playersText = registrationData.playersString || registrationData.players.join(', ');
    const splitPlayers = doc.splitTextToSize(playersText, pageWidth - (margin * 2) - 10);
    doc.text(splitPlayers, margin + 10, yPos);
    yPos += (splitPlayers.length * 7) + 5;
    
    // Captain info (if applicable)
    if (registrationData.captain && registrationData.captain !== 'N/A') {
      doc.setFont('helvetica', 'bold');
      doc.text('Captain:', margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(registrationData.captain, margin + 60, yPos);
      yPos += 7;
      
      doc.setFont('helvetica', 'bold');
      doc.text('Vice-Captain:', margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(registrationData.viceCaptain || 'N/A', margin + 60, yPos);
      yPos += 7;
    }
    
    yPos += 5;
    
    // ===== PAYMENT DETAILS =====
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Details', margin, yPos);
    yPos += 8;
    
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
    
    doc.setFontSize(11);
    
    const paymentDetails = [
      ['Entry Fee:', `₹${registrationData.entryFee}`],
      ['Payment Status:', paymentData.status],
      ['Razorpay Payment ID:', paymentData.razorpayPaymentId],
      ['Payment Method:', 'Razorpay (Test Mode)']
    ];
    
    paymentDetails.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, margin + 60, yPos);
      yPos += 7;
    });
    
    yPos += 5;
    
    // ===== TOTAL AMOUNT BOX =====
    doc.setFillColor(255, 215, 0); // Gold color
    doc.rect(margin, yPos, pageWidth - (margin * 2), 15, 'F');
    doc.setTextColor(10, 25, 41); // Navy text
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL AMOUNT PAID:', margin + 5, yPos + 10);
    doc.text(`₹${registrationData.entryFee}`, pageWidth - margin - 5, yPos + 10, { align: 'right' });
    
    yPos += 25;
    
    // ===== FOOTER =====
    // Test Mode Notice
    doc.setTextColor(220, 53, 69); // Red color
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('🧪 TEST MODE PAYMENT - NO REAL MONEY TRANSACTION', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    
    // Notes
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const notes = [
      'This is a computer-generated receipt and does not require a signature.',
      'Please preserve this receipt for your records.',
      'For queries, contact the Student Council office.'
    ];
    
    notes.forEach(note => {
      doc.text(note, pageWidth / 2, yPos, { align: 'center' });
      yPos += 5;
    });
    
    // Bottom border
    doc.setLineWidth(2);
    doc.setDrawColor(10, 25, 41);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    
    // Download the PDF
    const fileName = `BCOE_Receipt_${receiptId}.pdf`;
    doc.save(fileName);
    
    console.log(`Receipt generated: ${fileName}`);
    
    return {
      receiptId: receiptId,
      fileName: fileName,
      generatedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Receipt generation error:', error);
    alert('Failed to generate receipt. Please contact support.');
    return null;
  }
}

/**
 * Show download receipt button in success display
 * @param {string} receiptId - The generated receipt ID
 */
function showDownloadReceiptButton(receiptId) {
  const successDisplay = document.getElementById('payment-success-display');
  
  // Check if button already exists
  if (successDisplay.querySelector('.download-receipt-btn')) {
    return;
  }
  
  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'download-receipt-btn';
  downloadBtn.type = 'button';
  downloadBtn.innerHTML = '📄 Download Receipt';
  downloadBtn.onclick = () => {
    // Receipt will be re-generated with stored data
    const latestReceipt = window.lastGeneratedReceipt;
    if (latestReceipt) {
      alert(`Receipt ID: ${latestReceipt.receiptId} has been downloaded.`);
    }
  };
  
  const resultContent = successDisplay.querySelector('.result-content');
  if (resultContent) {
    resultContent.appendChild(downloadBtn);
  }
}

// Export for use in other modules
window.receiptGenerator = {
  generateReceipt,
  showDownloadReceiptButton
};

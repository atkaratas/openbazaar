const fs = require('fs');

const checkoutPath = 'src/app/(b2c-storefront)/checkout/page.tsx';
let checkoutContent = fs.readFileSync(checkoutPath, 'utf8');

checkoutContent = checkoutContent.replace(
  /const handlePayment = async \(e: React.FormEvent\) => \{[\s\S]*?\}, 1500\)\n  \}/,
  `const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const res = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items,
          currency: 'EUR',
          discountApplied
        })
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Payment session failed: ' + (data.error || 'Unknown error'));
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
    }
  }`
);

fs.writeFileSync(checkoutPath, checkoutContent);

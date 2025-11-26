import crypto from "crypto";

export function makeSignature(str: string, secret: string) {
  return crypto.createHmac("md5", secret).update(str).digest("hex");
}

export function createWayForPayForm(order: any, items: any[]) {
  const merchantAccount = process.env.WAYFORPAY_MERCHANT_ACCOUNT!;
  const merchantDomain = process.env.WAYFORPAY_MERCHANT_DOMAIN!;
  const secret = process.env.WAYFORPAY_MERCHANT_SECRET!;
  const returnUrl = process.env.NEXT_PUBLIC_WAYFORPAY_RETURN_URL!;

  const orderDate = Math.floor(Date.now() / 1000);
  const amount = order.totalPrice + order.deliveryPrice;

  const productNames = items.map((i) => i.name);
  const productCounts = items.map((i) => i.quantityProduct);
  const productPrices = items.map((i) => i.finalPrice);

  const sign = [
    merchantAccount,
    merchantDomain,
    order.orderRef,
    orderDate,
    amount,
    "UAH",
    ...productNames,
    ...productCounts,
    ...productPrices,
  ].join(";");

  const merchantSignature = makeSignature(sign, secret);

  const form = `
<form method="POST" action="https://secure.wayforpay.com/pay" name="wayforpay">
  <input type="hidden" name="merchantAccount" value="${merchantAccount}" />
  <input type="hidden" name="merchantDomainName" value="${merchantDomain}" />
  <input type="hidden" name="merchantSignature" value="${merchantSignature}" />
  <input type="hidden" name="orderReference" value="${order.orderRef}" />
  <input type="hidden" name="orderDate" value="${orderDate}" />
  <input type="hidden" name="amount" value="${amount}" />
  <input type="hidden" name="currency" value="UAH" />

  ${productNames
    .map(
      (n, i) => `
    <input type="hidden" name="productName[]" value="${n}" />
    <input type="hidden" name="productPrice[]" value="${productPrices[i]}" />
    <input type="hidden" name="productCount[]" value="${productCounts[i]}" />
  `
    )
    .join("")}

  <input type="hidden" name="clientFirstName" value="${order.name}" />
  <input type="hidden" name="clientLastName" value="${order.surname}" />
  <input type="hidden" name="clientEmail" value="${order.email ?? ""}" />
  <input type="hidden" name="clientPhone" value="${order.phoneNumber}" />

  <input type="hidden" name="returnUrl" value="${returnUrl}" />
</form>
`;
  return { form };
}

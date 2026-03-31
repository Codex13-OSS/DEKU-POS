function applyPromotions(order, menu) {
  const selectedPromoId = order && order.selectedPromoId;

  if (selectedPromoId !== 'combo_viernes_169') {
    return {
      promoApplied: false,
      promoType: null,
      promoDiscount: 0
    };
  }

  const ramen = order.items.find((i) =>
    i.productId === 'ramen_deku' &&
    i.meta &&
    i.meta.size === 'M'
  );

  const tempura = order.items.find((i) =>
    i.productId === 'side_tempura_3'
  );

  const bebida = order.items.find((i) =>
    i.productId === 'drink_pepsi'
  );

  const hasCombo = ramen && tempura && bebida;

  if (!hasCombo) {
    return {
      promoApplied: false,
      promoType: null,
      promoDiscount: 0
    };
  }

  const subtotal = order.items.reduce((sum, item) => {
    return sum + (item.unitPrice * item.qty);
  }, 0);

  const comboPrice = 169;

  const discount = subtotal - comboPrice;

  if (discount <= 0) {
    return {
      promoApplied: false,
      promoType: null,
      promoDiscount: 0
    };
  }

  return {
    promoApplied: true,
    promoType: 'combo_viernes_169',
    promoDiscount: discount
  };
}

module.exports = {
  applyPromotions
};

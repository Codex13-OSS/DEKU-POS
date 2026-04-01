function applyPromotions(order, menu) {
  const selectedPromoId = order && order.selectedPromoId;

  if (selectedPromoId !== 'combo_viernes_169') {
    return {
      promoApplied: false,
      promoType: null,
      promoDiscount: 0,
      comboSets: 0
    };
  }

  const expandedItems = [];
  (order.items || []).forEach((item) => {
    const qty = Number(item && item.qty);
    if (!Number.isFinite(qty) || qty <= 0) {
      return;
    }
    for (let i = 0; i < qty; i += 1) {
      expandedItems.push(item);
    }
  });

  const ramenM = expandedItems.filter((item) =>
    item &&
    item.productId === 'ramen_deku' &&
    item.meta &&
    item.meta.size === 'M'
  );
  const tempura3 = expandedItems.filter((item) =>
    item &&
    item.productId === 'side_tempura_3'
  );
  const pepsi = expandedItems.filter((item) =>
    item &&
    item.productId === 'drink_pepsi'
  );

  const sets = Math.min(ramenM.length, tempura3.length, pepsi.length);

  if (!sets) {
    return {
      promoApplied: false,
      promoType: null,
      promoDiscount: 0,
      comboSets: 0
    };
  }

  const ramenBaseTotal = ramenM
    .slice(0, sets)
    .reduce((sum, item) => sum + (Number(item.basePrice) || 0), 0);
  const tempuraTotal = tempura3
    .slice(0, sets)
    .reduce((sum, item) => sum + (Number(item.unitPrice) || 0), 0);
  const pepsiTotal = pepsi
    .slice(0, sets)
    .reduce((sum, item) => sum + (Number(item.unitPrice) || 0), 0);
  const comboBaseTotal = ramenBaseTotal + tempuraTotal + pepsiTotal;
  const promoPriceTotal = sets * 169;
  const discount = comboBaseTotal - promoPriceTotal;

  if (discount <= 0) {
    return {
      promoApplied: false,
      promoType: null,
      promoDiscount: 0,
      comboSets: 0
    };
  }

  return {
    promoApplied: true,
    promoType: 'combo_viernes_169',
    promoDiscount: discount,
    comboSets: sets
  };
}

module.exports = {
  applyPromotions
};

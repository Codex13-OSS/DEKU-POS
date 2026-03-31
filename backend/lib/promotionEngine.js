function applyPromotions(order, menu) {
  const items = Array.isArray(order && order.items) ? order.items : [];
  const selectedPromoId = order && order.selectedPromoId;

  if (selectedPromoId !== 'combo_viernes_169') {
    return {
      promoApplied: false,
      promoType: null,
      promoDiscount: 0
    };
  }

  const ramenMItems = items.filter((item) => item && item.productId === 'ramen_deku' && item.meta && item.meta.size === 'M');
  const tempura3Items = items.filter((item) => item && item.productId === 'side_tempura_3');
  const pepsiItems = items.filter((item) => item && item.productId === 'drink_pepsi');

  function sumQty(list) {
    return list.reduce((acc, i) => acc + (Number(i && i.qty) || 0), 0);
  }

  const qtyRamenM = sumQty(ramenMItems);
  const qtyTempura3 = sumQty(tempura3Items);
  const qtyPepsi = sumQty(pepsiItems);

  const combos = Math.min(qtyRamenM, qtyTempura3, qtyPepsi);

  if (combos === 0) {
    return {
      promoApplied: false,
      promoType: 'combo_viernes_169',
      promoDiscount: 0
    };
  }

  const getUnitPrice = (list) => {
    const found = list.find((item) => Number.isFinite(Number(item && item.unitPrice)));
    return found ? Number(found.unitPrice) : 0;
  };

  const precioRamen = getUnitPrice(ramenMItems);
  const precioTempura = getUnitPrice(tempura3Items);
  const precioPepsi = getUnitPrice(pepsiItems);

  const precioNormalCombo = precioRamen + precioTempura + precioPepsi;
  const precioPromo = 169;
  const descuentoUnitario = Math.max(0, precioNormalCombo - precioPromo);
  const promoDiscount = descuentoUnitario * combos;

  return {
    promoApplied: true,
    promoType: 'combo_viernes_169',
    promoDiscount
  };
}

module.exports = {
  applyPromotions
};

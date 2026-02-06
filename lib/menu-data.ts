export interface MenuItem {
  id: string
  name: string
  description: string
  priceEn: number
  priceFamilj?: number
  category: string
  vegetarian?: boolean
  spicy?: boolean
}

export interface MenuCategory {
  id: string
  name: string
  icon: string
  items: MenuItem[]
}

export const menuData: MenuCategory[] = [
  {
    id: "vardagspizzor",
    name: "Pizzor",
    icon: "pizza",
    items: [
      { id: "v1", name: "Margherita", description: "Tomatsås, mozzarella, parmesan", priceEn: 100, priceFamilj: 230, category: "vardagspizzor", vegetarian: true },
      { id: "v2", name: "Vesuvio", description: "Skinka", priceEn: 110, priceFamilj: 250, category: "vardagspizzor" },
      { id: "v3", name: "Capricciosa", description: "Skinka, champinjoner", priceEn: 115, priceFamilj: 260, category: "vardagspizzor" },
      { id: "v4", name: "Hawaii", description: "Skinka, ananas", priceEn: 115, priceFamilj: 260, category: "vardagspizzor" },
      { id: "v5", name: "Calzone", description: "Inbakad med skinka", priceEn: 110, category: "vardagspizzor" },
    ],
  },
  {
    id: "tacos-mexicana",
    name: "Tacos / Mexicana & Köttpizzor",
    icon: "beef",
    items: [
      { id: "t1", name: "Tacopizza", description: "Tacokryddad nötfärs, tacosås, nachos, gräddfil", priceEn: 125, priceFamilj: 280, category: "tacos-mexicana", spicy: true },
      { id: "t2", name: "Mexicana", description: "Köttfärs, champinjoner, lök, vitlök, tacosås, jalapeño", priceEn: 125, priceFamilj: 280, category: "tacos-mexicana", spicy: true },
      { id: "t3", name: "Oxfilé & Bearnaise", description: "Oxfilé, béarnaisesås", priceEn: 130, priceFamilj: 290, category: "tacos-mexicana" },
      { id: "t4", name: "Oxfilé Special", description: "Oxfilé, färska champinjoner, lök, färska tomater, bearnaisesås", priceEn: 130, priceFamilj: 290, category: "tacos-mexicana" },
      { id: "t5", name: "Acapulco", description: "Oxfilé, champinjoner, lök, vitlök, tacosås, jalapeño", priceEn: 130, priceFamilj: 290, category: "tacos-mexicana", spicy: true },
    ],
  },
  {
    id: "kycklingpizzor",
    name: "Kycklingpizzor",
    icon: "drumstick",
    items: [
      { id: "k1", name: "Kycklingpizza", description: "Kyckling, banan, curry, jordnötter, valfri sås", priceEn: 115, priceFamilj: 260, category: "kycklingpizzor" },
      { id: "k2", name: "Kycklingkebab", description: "Kycklingkebab, valfri sås", priceEn: 115, priceFamilj: 260, category: "kycklingpizzor" },
      { id: "k3", name: "Kyckling & BBQ", description: "Kyckling, BBQ-sås, rödlök", priceEn: 115, priceFamilj: 260, category: "kycklingpizzor" },
      { id: "k4", name: "Kyckling Pesto", description: "Kyckling, grön pesto, marinerad skivade-tomater", priceEn: 115, priceFamilj: 260, category: "kycklingpizzor" },
    ],
  },
  {
    id: "fisk-skaldjur",
    name: "Fisk & Skaldjur",
    icon: "fish",
    items: [
      { id: "f1", name: "Tonfiskpizza", description: "Tonfisk, lök", priceEn: 110, priceFamilj: 250, category: "fisk-skaldjur" },
    ],
  },
  {
    id: "kebab-special",
    name: "Kebab / Specialpizzor",
    icon: "utensils",
    items: [
      { id: "kb1", name: "Kebabpizza", description: "Kebabkött, ost, lök, feferoni, valfri sås", priceEn: 115, priceFamilj: 260, category: "kebab-special" },
      { id: "kb2", name: "Pommes pizza", description: "Kebabkött, pommes, valfri sås", priceEn: 120, priceFamilj: 270, category: "kebab-special" },
      { id: "kb3", name: "Konkurs pizza", description: "Kebabkött, tomat, lök, gurka, sallad, feferoni, valfri sås", priceEn: 120, priceFamilj: 270, category: "kebab-special" },
    ],
  },
  {
    id: "lyxpizzor",
    name: "Lyxpizzor / Speciella",
    icon: "sparkles",
    items: [
      { id: "l1", name: "Oxfilé & Bearnaise Supreme", description: "Oxfilé, sparris, parmesan", priceEn: 130, priceFamilj: 290, category: "lyxpizzor" },
      { id: "l2", name: "Getost & Honung", description: "Getost, rödbetor, honung, valnöt, ruccola (bianco/tomatsås)", priceEn: 130, priceFamilj: 290, category: "lyxpizzor", vegetarian: true },
      { id: "l3", name: "Secret Level Pizza", description: "Tomatsås, grillad kyckling, krämig pesto, fetaost, krispiga salt & vinägerchips", priceEn: 130, priceFamilj: 290, category: "lyxpizzor" },
    ],
  },
  {
    id: "rullar-tallrikar",
    name: "Rullar / Tallrikar",
    icon: "wrap",
    items: [
      { id: "r1", name: "Kebab i bröd", description: "Kebabkött, sallad, tomat, gurka, feferoni, valfri sås", priceEn: 100, category: "rullar-tallrikar" },
      { id: "r2", name: "Kebabrulle", description: "Kebabkött, sallad, tomat, gurka, feferoni, valfri sås", priceEn: 100, category: "rullar-tallrikar" },
      { id: "r3", name: "Kebabtallrik", description: "Kebabkött, pommes, sallad, tomat, gurka, feferoni, valfri sås", priceEn: 115, category: "rullar-tallrikar" },
      { id: "r4", name: "Kycklingrulle", description: "Kyckling/kycklingkebab, sallad, tomat, gurka, feferoni, valfri sås", priceEn: 100, category: "rullar-tallrikar" },
      { id: "r5", name: "Kycklingtallrik", description: "Kyckling/kycklingkebab, pommes, sallad, tomat, gurka, feferoni, valfri sås", priceEn: 115, category: "rullar-tallrikar" },
      { id: "r6", name: "Falafelrulle", description: "Falafel, sallad, tomat, gurka, feferoni, valfri sås", priceEn: 75, category: "rullar-tallrikar", vegetarian: true },
      { id: "r7", name: "Falafeltallrik", description: "Falafel, pommes, sallad, tomat, gurka, feferoni, valfri sås", priceEn: 100, category: "rullar-tallrikar", vegetarian: true },
    ],
  },
  {
    id: "burgare",
    name: "Burgare / Smash",
    icon: "sandwich",
    items: [
      { id: "b1", name: "Cheeseburger 2x90gr", description: "Högkvalitativ nötkött, smörrostat briochebröd, dubbel cheddarost, hackad gul lök, picklad gurka, ketchup och senap", priceEn: 120, category: "burgare" },
      { id: "b2", name: "Hot N' Cheesy 2x90gr", description: "Högkvalitativ nötkött, smörrostat briochebröd, Chili Majo, jalapeños, karamelliserad lök, rostad lök, trippel cheddarost serveras med pommes", priceEn: 120, category: "burgare", spicy: true },
      { id: "b3", name: "Halloumiburger", description: "Smörrostat briochebröd, Chili Majo, Jalapeños, krispsallad, tomat, syltad rödlök och cheddarost och serveras med pommes", priceEn: 100, category: "burgare", vegetarian: true },
      { id: "b4", name: "Grilled Chicken Classic", description: "Grillad kycklingfilé, krispsallad, tomat, picklad rödlök, krämig aioli i smörrostat briochebröd serveras med pommes", priceEn: 100, category: "burgare" },
    ],
  },
  {
    id: "shawarma",
    name: "Shawarma & Pommes",
    icon: "french-fries",
    items: [
      { id: "s1", name: "Shawarma arabi (Kyckling)", description: "Kyckling shawarma rulle delad i bitar serveras med pommes, vitlökssås, tomat, mixed pickles, granatäppelsås", priceEn: 105, category: "shawarma" },
      { id: "s2", name: "Kyckling Shawarma Rulle", description: "Kyckling, vitlökssås, saltgurka, granatäppelsås", priceEn: 80, category: "shawarma" },
      { id: "s3", name: "Lamm shawarmarulle", description: "Lammkött, tomat, saltgurka, persilja, lök, inlagd rättika, tahinisås, granatäppelsås", priceEn: 90, category: "shawarma" },
      { id: "s4", name: "Shawarma arabi (Lamm)", description: "Lammkött, pommes, persiljesallad, tomat, inlagd rättika, tahinisås, granatäppelsås", priceEn: 115, category: "shawarma" },
      { id: "s5", name: "Pommesrulle", description: "Pommes, vitlökssås, coleslaw, ketchup", priceEn: 65, category: "shawarma", vegetarian: true },
      { id: "s6", name: "Pommestallrik", description: "Pommes + valfri sås", priceEn: 50, category: "shawarma", vegetarian: true },
    ],
  },
]

// Alias for menuData to match component imports
export const menuCategories = menuData

export const getAllMenuItems = (): MenuItem[] => {
  return menuData.flatMap((category) => category.items)
}

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return getAllMenuItems().find((item) => item.id === id)
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const now = new Date();

const products = [
  {
    productId: "cwy-wp-001",
    brand: "코웨이",
    modelName: "아이콘 직수 냉온정수기 Lite",
    category: "water_purifier",
    monthlyFee: 31900,
    promoFee: 28900,
    promoDurationMonth: 12,
    postPromoFee: 31900,
    mandatoryUseMonth: 36,
    contractTotalMonth: 60,
    managementType: "visit",
    installFee: 0,
    removalFee: 50000,
    supportsMove: true,
    terminationRuleNote: "약정 내 해지 시 위약금이 발생할 수 있습니다.",
    features: ["cold", "hot", "purify"],
    sizeTier: "slim",
    stockStatus: "active",
    updatedAt: now,
  },
  {
    productId: "skm-wp-013",
    brand: "SK매직",
    modelName: "스스로직수 정수기",
    category: "water_purifier",
    monthlyFee: 27900,
    promoFee: 24900,
    promoDurationMonth: 12,
    postPromoFee: 27900,
    mandatoryUseMonth: 36,
    contractTotalMonth: 48,
    managementType: "self",
    installFee: 0,
    removalFee: 50000,
    supportsMove: true,
    terminationRuleNote: "해지 전 설치/회수 비용을 확인하세요.",
    features: ["cold", "purify"],
    sizeTier: "slim",
    stockStatus: "active",
    updatedAt: now,
  },
  {
    productId: "ckc-wp-027",
    brand: "쿠쿠",
    modelName: "셀프관리 스탠다드",
    category: "water_purifier",
    monthlyFee: 25900,
    promoFee: 22900,
    promoDurationMonth: 12,
    postPromoFee: 25900,
    mandatoryUseMonth: 36,
    contractTotalMonth: 48,
    managementType: "self",
    installFee: 0,
    removalFee: 40000,
    supportsMove: true,
    terminationRuleNote: "약정 내 해지 수수료가 발생할 수 있습니다.",
    features: ["cold", "hot", "purify"],
    sizeTier: "standard",
    stockStatus: "active",
    updatedAt: now,
  },
  {
    productId: "ckc-wp-028",
    brand: "쿠쿠",
    modelName: "방문관리 패밀리형",
    category: "water_purifier",
    monthlyFee: 32900,
    promoFee: 28900,
    promoDurationMonth: 12,
    postPromoFee: 32900,
    mandatoryUseMonth: 48,
    contractTotalMonth: 60,
    managementType: "visit",
    installFee: 0,
    removalFee: 50000,
    supportsMove: true,
    terminationRuleNote: "장기 의무사용기간이라 이사 계획이 있으면 주의가 필요합니다.",
    features: ["cold", "hot", "purify"],
    sizeTier: "large",
    stockStatus: "active",
    updatedAt: now,
  },
  {
    productId: "cwy-wp-002",
    brand: "코웨이",
    modelName: "아이콘 얼음정수기 Pro",
    category: "water_purifier",
    monthlyFee: 37900,
    promoFee: 33900,
    promoDurationMonth: 12,
    postPromoFee: 37900,
    mandatoryUseMonth: 48,
    contractTotalMonth: 72,
    managementType: "visit",
    installFee: 0,
    removalFee: 50000,
    supportsMove: true,
    terminationRuleNote: "약정 내 해지 시 위약금이 발생할 수 있습니다.",
    features: ["cold", "hot", "purify", "ice"],
    sizeTier: "slim",
    stockStatus: "active",
    updatedAt: now,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { productId: product.productId },
      create: product,
      update: product,
    });
  }

  console.warn(`Seeded ${products.length} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

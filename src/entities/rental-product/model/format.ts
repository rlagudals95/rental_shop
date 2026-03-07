export const formatWon = (price: number): string => `${price.toLocaleString("ko-KR")}원`;

export const formatManagement = (value: "visit" | "self"): string =>
  value === "visit" ? "방문관리" : "셀프관리";

export const formatFeature = (value: "cold" | "hot" | "purify" | "ice"): string => {
  if (value === "cold") return "냉수";
  if (value === "hot") return "온수";
  if (value === "purify") return "정수";
  return "얼음";
};

"use client";
import HeaderOther from "@/app/components/HeaderOther";
import PromoCardWidget from "@/app/components/PromoCardWidget";
import Footer from "@/app/components/Footer";
import { Bed, Bath, MoveUpRight } from "lucide-react";
import { useState, useMemo } from "react";
import { images, floorPlans, type FloorPlan } from "@/app/config/content";
import { headerConfig } from "@/app/config/content";
import FooterLegalBar from "@/app/components/FooterLegalBar";

type CardProps = {
  plan: FloorPlan;
  isSelected: boolean;
  canSelectMore: boolean;
  onToggleCompare: (title: string) => void;
  onViewDetail: (plan: FloorPlan) => void;
};

function Card({
  plan,
  isSelected,
  canSelectMore,
  onToggleCompare,
  onViewDetail,
}: CardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % plan.interiorImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? plan.interiorImages.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <div className="bg-[#fffdf9] rounded-[26px] overflow-hidden border border-[#e5ded3] shadow-[0_18px_45px_rgba(26,29,27,0.12)]">
        {/* TOP IMAGE */}
        <div className="relative h-[275px] w-full overflow-hidden rounded-t-[26px]">
          <img
            src={plan.interiorImages[currentImage]}
            alt={
              plan.interiorImages[currentImage] === images.floor7
                ? images.floor_alt7
                : plan.interiorImages[currentImage] === images.floor8
                  ? images.floor_alt8
                  : plan.interiorImages[currentImage] === images.floor9
                    ? images.floor_alt9
                    : ""
            }
            className="h-full w-full object-cover"
          />

          {plan.popular && (
            <div className="absolute left-4 top-4 rounded-full bg-[#E09428] px-4 py-2 font-[Plus_Jakarta_Sans] text-[12px] font-bold text-white shadow-md">
              Premium
            </div>
          )}

          <div className="absolute right-4 top-4 rounded-full bg-[#2f3642]/95 px-4 py-2 font-[Plus_Jakarta_Sans] text-[13px] font-bold text-white shadow-md">
            {plan.available}
          </div>

          <button
            onClick={prevImage}
            className="absolute left-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-[24px] leading-none text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            ‹
          </button>

          <button
            onClick={nextImage}
            className="absolute right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-[24px] leading-none text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {plan.interiorImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`rounded-full transition-all ${
                  currentImage === index
                    ? "h-[7px] w-[23px] bg-white"
                    : "h-[7px] w-[7px] bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* FLOOR PLAN IMAGE */}
        <div className="relative h-[355px] w-full border-b border-[#eee7dc] bg-[#fbfaf7]">
          <img
            src={plan.images[0]}
            alt={
              plan.images[0] === images.floor1
                ? images.floor_alt1
                : plan.images[0] === images.floor2
                  ? images.floor_alt2
                  : plan.images[0] === images.floor3
                    ? images.floor_alt3
                    : plan.images[0] === images.floor4
                      ? images.floor_alt4
                      : plan.images[0] === images.floor5
                        ? images.floor_alt5
                        : images.floor_alt6
            }
            className="h-full w-full object-contain p-8"
          />
        </div>

        {/* CONTENT */}
        <div className="bg-[#fffdf9] px-6 pb-7 pt-7 md:px-7">
          <p className="mb-2 font-[Plus_Jakarta_Sans] text-[12px] font-bold uppercase tracking-[0.22em] text-[#E09428]">
            {plan.series}
          </p>

          <h3 className="font-[Instrument_Serif] text-[31px] leading-none tracking-[-0.02em] text-[#111827]">
            {plan.title}
          </h3>

          <p className="mt-5 min-h-[48px] font-[Plus_Jakarta_Sans] text-[16px] leading-[1.45] tracking-[-0.02em] text-[#314057]">
            {plan.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 font-[Plus_Jakarta_Sans] text-[15px] font-bold text-[#15191f]">
            {/* Bedrooms */}
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-[#1f376d]" strokeWidth={2} />
              <span>{plan.beds}</span>
            </div>

            {/* Bathrooms */}
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-[#1f376d]" strokeWidth={2} />
              <span>{plan.baths}</span>
            </div>

            {/* Square Footage */}
            <div className="flex items-center gap-2">
              {/* Combined with a relative container to get the exact double-ended diagonal arrow look */}
              <div className="relative h-5 w-5 text-[#1f376d]">
                <MoveUpRight
                  className="absolute inset-0 h-5 w-5"
                  strokeWidth={2}
                />
                <MoveUpRight
                  className="absolute inset-0 h-5 w-5 rotate-180"
                  strokeWidth={2}
                />
              </div>
              <span>{plan.area} sq ft</span>
            </div>
          </div>

          <div className="mt-7 flex items-end gap-2">
            <p className="font-[Instrument_Serif] text-[39px] leading-none tracking-[-0.04em] text-[#1f376d]">
              {plan.price}
            </p>
            <span className="mb-[3px] font-[Plus_Jakarta_Sans] text-[13px] text-[#555]">
              per month
            </span>
          </div>

          <div className="mt-7 flex min-h-[68px] flex-wrap content-start gap-2">
            {plan.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#cbd3df] bg-[#f3f6fb] px-4 py-[7px] font-[Plus_Jakarta_Sans] text-[13px] font-bold leading-none text-[#18376f]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-[50px] flex flex-col gap-3">
            {plan.tour?.trim() && (
              <button
                onClick={() => window.open(plan.tour, "_blank")}
                className="flex h-[50px] w-full items-center justify-center gap-2 rounded-[12px] border border-[#e09428] bg-white font-[Plus_Jakarta_Sans] text-[15px] font-bold text-[#e09428] transition hover:bg-[#faf7ef]"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Virtual Tour</span>
              </button>
            )}

            {/* Bottom Buttons */}
            <div className="grid grid-cols-[1fr_105px] gap-3">
              <button
                onClick={() => onViewDetail(plan)}
                className="h-[50px] rounded-[11px] bg-[#223f82] font-[Plus_Jakarta_Sans] text-[16px] font-bold text-white transition hover:bg-[#19346f]"
              >
                View Unit
              </button>

              <button
                onClick={() => onToggleCompare(plan.title)}
                disabled={!isSelected && !canSelectMore}
                className={`h-[50px] rounded-[11px] border font-[Plus_Jakarta_Sans] text-[15px] font-bold transition ${
                  isSelected
                    ? "border-[#223f82] bg-[#223f82] text-white"
                    : canSelectMore
                      ? "border-[#cbd3df] bg-white text-[#3c3c3c] hover:bg-[#f5f7fb]"
                      : "cursor-not-allowed border-[#e4ddd2] bg-[#f3efe8] text-[#b2aaa0]"
                }`}
              >
                {isSelected ? "Selected" : "Compare"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ComparisonDrawer({
  leftPlan,
  rightPlan,
  onClear,
}: {
  leftPlan: FloorPlan;
  rightPlan: FloorPlan;
  onClear: () => void;
}) {
  const rows = [
    { label: "BEDROOMS", left: leftPlan.beds, right: rightPlan.beds },
    { label: "BATHROOMS", left: leftPlan.baths, right: rightPlan.baths },
    { label: "SQ FOOTAGE", left: leftPlan.area, right: rightPlan.area },
    { label: "PRICE", left: leftPlan.price, right: rightPlan.price },
    {
      label: "AVAILABLE",
      left: leftPlan.available,
      right: rightPlan.available,
    },
  ];

  const biggerArea = (a: string, b: string) =>
    parseInt(a.replace(/[^0-9]/g, ""), 10) >
    parseInt(b.replace(/[^0-9]/g, ""), 10);

  const cheaperPrice = (a: string, b: string) =>
    parseInt(a.replace(/[^0-9]/g, ""), 10) <
    parseInt(b.replace(/[^0-9]/g, ""), 10);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClear} />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F5F2ED] rounded-t-[28px] shadow-2xl border-t border-[#d8d2c7] max-h-[82vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#F5F2ED] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 pb-6 border-b border-[#ddd7cc]">
          <div className="w-14 h-1.5 rounded-full bg-[#d1cbc1] mx-auto mb-5" />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#29488d]" />
              <p className="text-sm md:text-[22px] tracking-[0.14em] uppercase text-[#29488d] font-semibold">
                Comparing {leftPlan.title} vs {rightPlan.title}
              </p>
            </div>

            <button
              onClick={onClear}
              className="text-[#5c5752] text-sm md:text-base whitespace-nowrap"
            >
              × Clear Comparison
            </button>
          </div>
        </div>

        <div className="px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-8">
          {/* desktop */}
          <div className="hidden md:grid grid-cols-[220px_1fr_1fr] gap-8">
            <div className="pt-[74px]">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="h-[52px] border-t border-[#d8d2c7] flex items-center text-[#666b67] text-[15px] font-semibold tracking-[0.08em]"
                >
                  {row.label}
                </div>
              ))}
            </div>

            <div>
              <div className="h-[74px] flex items-center border-b border-[#d8d2c7]">
                <h3 className="text-[38px] font-[Instrument_Serif] text-[#2d3230]">
                  {leftPlan.title}
                </h3>
              </div>

              {rows.map((row) => {
                const highlight =
                  row.label === "PRICE"
                    ? cheaperPrice(leftPlan.price, rightPlan.price)
                    : row.label === "SQ FOOTAGE"
                      ? biggerArea(leftPlan.area, rightPlan.area)
                      : false;

                return (
                  <div
                    key={row.label}
                    className="h-[52px] border-b border-[#d8d2c7] flex items-center text-[22px] text-[#2d3230]"
                  >
                    <span
                      className={
                        highlight ? "text-[#29488d] font-semibold" : ""
                      }
                    >
                      {row.left}
                    </span>
                    {highlight && (
                      <span className="ml-2 text-[#E09428]">★</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              <div className="h-[74px] flex items-center gap-3 border-b border-[#d8d2c7]">
                <h3 className="text-[38px] font-[Instrument_Serif] text-[#2d3230]">
                  {rightPlan.title}
                </h3>

                {rightPlan.popular && (
                  <span className="bg-[#E09428] text-white text-xs px-3 py-1 rounded-full font-medium">
                    Premium
                  </span>
                )}
              </div>

              {rows.map((row) => {
                const highlight =
                  row.label === "PRICE"
                    ? cheaperPrice(rightPlan.price, leftPlan.price)
                    : row.label === "SQ FOOTAGE"
                      ? biggerArea(rightPlan.area, leftPlan.area)
                      : false;

                return (
                  <div
                    key={row.label}
                    className="h-[52px] border-b border-[#d8d2c7] flex items-center text-[22px] text-[#2d3230]"
                  >
                    <span
                      className={
                        highlight ? "text-[#29488d] font-semibold" : ""
                      }
                    >
                      {row.right}
                    </span>
                    {highlight && (
                      <span className="ml-2 text-[#E09428]">★</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* mobile */}
          <div className="md:hidden space-y-6">
            {[leftPlan, rightPlan].map((plan) => (
              <div
                key={plan.title}
                className="bg-white rounded-2xl border border-[#ddd7cc] p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-[28px] font-[Instrument_Serif] text-[#2d3230]">
                    {plan.title}
                  </h3>
                  {plan.popular && (
                    <span className="bg-[#E09428] text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
                      Premium
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 border-b border-[#ece5d9] pb-3"
                    >
                      <span className="text-xs tracking-[0.08em] text-[#666b67] font-semibold">
                        {row.label}
                      </span>
                      <span className="text-[#2d3230] font-medium">
                        {plan.title === leftPlan.title ? row.left : row.right}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function UnitDetailModal({
  plan,
  onClose,
}: {
  plan: FloorPlan;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);

  const allImages = [...plan.interiorImages, plan.images[0]];

  const features = [
    "Clean Finish Countertops",
    "LVP Flooring",
    "9 ft Ceilings",
    "In-Unit W/D Connections",
    "Covered Patio/Balcony",
    "Central Air & Heat",
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07122b]/75 px-4 py-6 backdrop-blur-[6px]">
      <div className="relative max-h-[92vh] w-full max-w-[1080px] overflow-hidden rounded-[26px] bg-[#fffdf9] shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#e5ded3] px-6 py-6 md:px-8">
          <div>
            <p className="font-[Plus_Jakarta_Sans] text-[12px] font-bold uppercase tracking-[0.24em] text-[#E09428]">
              {plan.series}
            </p>
            <h2 className="mt-2 font-[Instrument_Serif] text-[34px] leading-none text-[#111827]">
              {plan.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#f1efec] text-[26px] text-[#222] hover:bg-[#e7e2dc]"
          >
            ×
          </button>
        </div>

        <div className="max-h-[calc(92vh-105px)] overflow-y-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-r border-[#e5ded3]">
              <div className="relative h-[320px] md:h-[365px] bg-[#f7f4ee]">
                <img
                  src={allImages[activeImage]}
                  alt={
                    allImages[activeImage] === images.floor1
                      ? images.floor_alt1
                      : allImages[activeImage] === images.floor2
                        ? images.floor_alt2
                        : allImages[activeImage] === images.floor3
                          ? images.floor_alt3
                          : allImages[activeImage] === images.floor4
                            ? images.floor_alt4
                            : allImages[activeImage] === images.floor5
                              ? images.floor_alt5
                              : allImages[activeImage] === images.floor6
                                ? images.floor_alt6
                                : allImages[activeImage] === images.floor7
                                  ? images.floor_alt7
                                  : allImages[activeImage] === images.floor8
                                    ? images.floor_alt8
                                    : allImages[activeImage] === images.floor9
                                      ? images.floor_alt9
                                      : ""
                  }
                />
              </div>

              <div className="flex gap-3 px-5 py-4">
                {allImages.slice(0, 4).map((img, index) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(index)}
                    className={`h-[58px] w-[78px] overflow-hidden rounded-[9px] border-2 ${
                      activeImage === index
                        ? "border-[#1e3872]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={
                        img === images.floor1
                          ? images.floor_alt1
                          : img === images.floor2
                            ? images.floor_alt2
                            : img === images.floor3
                              ? images.floor_alt3
                              : img === images.floor4
                                ? images.floor_alt4
                                : img === images.floor5
                                  ? images.floor_alt5
                                  : img === images.floor6
                                    ? images.floor_alt6
                                    : img === images.floor7
                                      ? images.floor_alt7
                                      : img === images.floor8
                                        ? images.floor_alt8
                                        : img === images.floor9
                                          ? images.floor_alt9
                                          : ""
                      }
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="bg-[#fbfaf7] px-6 pb-8 pt-4">
                <img
                  src={plan.images[0]}
                  alt={
                    plan.images[0] === images.floor1
                      ? images.floor_alt1
                      : plan.images[0] === images.floor2
                        ? images.floor_alt2
                        : plan.images[0] === images.floor3
                          ? images.floor_alt3
                          : plan.images[0] === images.floor4
                            ? images.floor_alt4
                            : plan.images[0] === images.floor5
                              ? images.floor_alt5
                              : plan.images[0] === images.floor6
                                ? images.floor_alt6
                                : plan.images[0] === images.floor7
                                  ? images.floor_alt7
                                  : plan.images[0] === images.floor8
                                    ? images.floor_alt8
                                    : plan.images[0] === images.floor9
                                      ? images.floor_alt9
                                      : ""
                  }
                  className="mx-auto max-h-[360px] w-full object-contain"
                />
              </div>
            </div>

            <div className="px-6 py-8 md:px-8">
              <p className="font-[Plus_Jakarta_Sans] text-[17px] leading-[1.7] text-[#314057]">
                {plan.description}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-4">
                {[
                  ["BEDROOMS", plan.beds],
                  ["BATHROOMS", plan.baths],
                  ["SQUARE FEET", plan.area],
                  ["STARTING FROM", plan.price],
                  ["AVAILABLE", plan.available.replace("available", "units")],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[12px] bg-[#f1efec] px-4 py-4"
                  >
                    <p className="font-[Plus_Jakarta_Sans] text-[11px] font-bold uppercase tracking-[0.16em] text-[#4b5563]">
                      {label}
                    </p>
                    <p className="mt-2 font-[Instrument_Serif] text-[24px] leading-none text-[#111827]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="font-[Plus_Jakarta_Sans] text-[12px] font-bold uppercase tracking-[0.22em] text-[#334155]">
                  Included Features
                </p>

                <div className="mt-5 space-y-3">
                  {features.map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-3 font-[Plus_Jakarta_Sans] text-[16px] text-[#111827]"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#1e3872] text-[10px] text-[#1e3872]">
                        ✓
                      </span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <a
                href={headerConfig.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 flex h-[62px] w-full items-center justify-center rounded-[14px] bg-[#223f82] font-[Plus_Jakarta_Sans] text-[18px] font-bold text-white shadow-[0_12px_28px_rgba(30,56,114,0.28)] transition hover:bg-[#19346f]"
              >
                Apply for This Unit →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Floor() {
  const [selectedCompare, setSelectedCompare] = useState<string[]>([]);
  const [detailPlan, setDetailPlan] = useState<FloorPlan | null>(null);
  const [selectedBedroom, setSelectedBedroom] = useState("All Plans");

  const bedroomFilters = ["All Plans", "1 Bedroom", "2 Bedrooms", "3 Bedrooms"];

  const filteredFloorPlans = useMemo(() => {
    if (selectedBedroom === "All Plans") {
      return floorPlans;
    }

    const bedroomCount = Number(selectedBedroom.match(/\d+/)?.[0] ?? 0);

    return floorPlans.filter((plan) => {
      const planBedrooms = Number(String(plan.beds).match(/\d+/)?.[0] ?? 0);

      return planBedrooms === bedroomCount;
    });
  }, [selectedBedroom]);

  const toggleCompare = (title: string) => {
    setSelectedCompare((prev) => {
      if (prev.includes(title)) {
        return prev.filter((item) => item !== title);
      }
      if (prev.length === 2) return prev;
      return [...prev, title];
    });
  };

  const selectedPlans = useMemo(
    () => floorPlans.filter((plan) => selectedCompare.includes(plan.title)),
    [selectedCompare],
  );

  const clearComparison = () => setSelectedCompare([]);

  return (
    <>
      <HeaderOther />

      <PromoCardWidget />
      <section className="relative overflow-hidden bg-[#1f376d] text-[#F5F2ED] min-h-[620px] px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto py-24 md:py-28 mx-auto pt-[84px] pb-20">
        {/* subtle dotted background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(245,242,237,0.45)_1px,transparent_1px)] [background-size:50px_50px]" />

        <div className="relative z-10 max-w-[680px]">
          <p className="text-xs tracking-[0.3em] text-[#E09428] mb-6 mt-[15px] font-bold uppercase">
            Western Station at Fossil Creek . Fort Worth, TX
          </p>

          <h1 className="font-[Instrument_Serif] text-[56px] md:text-[56px] leading-[0.98] tracking-[-0.04em] text-[#F5F2ED]">
            Floor Plans & <br />
            <span className="italic text-[#E09428]">Pricing</span>
          </h1>

          <p className="mt-[28px] max-w-[570px] font-[Plus_Jakarta_Sans] text-[20px] leading-[1.72] text-[#b7bfd0] tracking-[-0.04em]">
            Nine thoughtfully designed layouts from spacious 1-bedroom
            apartments with den options to sprawling 3-bedroom layouts with two
            private patios
          </p>

          <div className="mt-[58px] grid grid-cols-2 md:grid-cols-4 gap-x-[52px] gap-y-8">
            {[
              ["9", "FLOOR PLANS"],
              ["15", "UNITS AVAILABLE"],
              ["624–1,340", "SQ FT RANGE"],
              ["$1,325", "STARTING FROM"],
            ].map(([value, label]) => (
              <div key={label}>
                <h2 className="font-[Instrument_Serif] text-[34px] leading-none text-white tracking-[-0.05em]">
                  {value}
                </h2>
                <p className="mt-[15px] font-[Plus_Jakarta_Sans] text-[13px] font-bold uppercase tracking-[0.16em] text-[#8f9fc3] whitespace-nowrap">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floor Plans */}

      <section className="bg-[#F5F2ED]">
        {/* Bedroom Filters */}

        <div className="border-b border-[#dedbd6] bg-white">
          <div className="mx-auto flex max-w-[1920px] items-center gap-2 overflow-x-auto px-6 py-4 md:px-20 lg:px-40 xl:px-40 xxl:px-80">
            {bedroomFilters.map((filter) => {
              const active = selectedBedroom === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedBedroom(filter)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-6 py-2.5 font-[Plus_Jakarta_Sans] text-[15px] font-semibold transition-all duration-200 ${
                    active
                      ? "border-[#1f376d] bg-[#1f376d] text-white"
                      : "border-[#d5d3d0] bg-white text-[#555b5b] hover:border-[#1f376d] hover:text-[#1f376d]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Floor Plans */}

        <div className="px-6 py-16 md:px-20 lg:px-40 xl:px-40 xxl:px-80">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredFloorPlans.length > 0 ? (
              filteredFloorPlans.map((plan) => (
                <Card
                  key={plan.title}
                  plan={plan}
                  isSelected={selectedCompare.includes(plan.title)}
                  canSelectMore={selectedCompare.length < 2}
                  onToggleCompare={toggleCompare}
                  onViewDetail={setDetailPlan}
                />
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="font-[Instrument_Serif] text-3xl text-[#1f376d]">
                  No floor plans available
                </p>

                <p className="mt-2 font-[Plus_Jakarta_Sans] text-sm text-[#666b67]">
                  No floor plans are currently available for this bedroom type.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedPlans.length === 2 && (
        <ComparisonDrawer
          leftPlan={selectedPlans[0]}
          rightPlan={selectedPlans[1]}
          onClear={clearComparison}
        />
      )}

      {detailPlan && (
        <UnitDetailModal
          plan={detailPlan}
          onClose={() => setDetailPlan(null)}
        />
      )}

      <section className="bg-[#F5F2ED] pb-24 px-6 xs:px-6 sm:px-6 md:px-20 lg:px-40 xl:px-40 xxl:px-80 mx-auto">
        <div className="mx-auto max-w-[1600px]">
          <div className="rounded-[20px] border border-dashed border-[#bdc8d8] bg-[#f1eeee] px-9 py-7">
            <div className="flex items-center gap-4">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[12px] bg-[#d9dce4]">
                <span className="flex h-[21px] w-[21px] items-center justify-center rounded-full border-2 border-[#173a7a] text-[13px] font-bold text-[#173a7a]">
                  ✓
                </span>
              </div>

              <div>
                <p className="font-[Plus_Jakarta_Sans] text-[17px] font-bold text-[#123a78]">
                  Compare any two floor plans
                </p>

                <p className="mt-1 font-[Plus_Jakarta_Sans] text-[15px] text-[#334155]">
                  Click "Compare" on any two cards to see a side-by-side
                  breakdown of specs and pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <FooterLegalBar />
    </>
  );
}

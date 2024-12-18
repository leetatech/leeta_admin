import React from "react";
import { TypographyProps, TypographyVariant } from "../types";

const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  className,
}) => {
  const classes = {
    [TypographyVariant.TITLE]: "text-[32px] tracking-wide leading-[38.73px] font-medium text-black font-title",
    [TypographyVariant.SUBTITLE]: "font-semibold text-[20px] leading-[26px] text-l_black font-title",
    [TypographyVariant.BODY_DEFAULT_MEDIUM]: "text-[14px] leading-[26px] font-medium text-gray font-title",
    [TypographyVariant.BODY_SMALL_MEDIUM]: "text-[12px] font-medium leading-[22px] text-d_gray font-title ",
    [TypographyVariant.SMALL]: "text-[11px] font-normal leading-[22px] text-d_gray font-title ",

  }[variant];

  return <div className={`${classes} ${className}`}>{children}</div>;
};

export default Typography;

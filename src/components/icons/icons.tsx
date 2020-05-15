import React from "react";

import iconSearch from "assets/icons/icon-search.svg";
import iconStarFill from "assets/icons/icon-star-fill.svg";
import iconStarHalf from "assets/icons/icon-star-half.svg";
import iconStar from "assets/icons/icon-star.svg";
import iconCalendar from "assets/icons/icon-calendar.svg";
import iconClock from "assets/icons/icon-clock.svg";
import iconCountry from "assets/icons/icon-country.svg";
import iconPrice from "assets/icons/icon-price.svg";
import iconWeb from "assets/icons/icon-web.svg";
import iconGrid from "assets/icons/icon-grid.svg";
import iconPopularity from "assets/icons/icon-popularity.svg";
import iconPeoples from "assets/icons/icon-peoples.svg";
import iconVote from "assets/icons/icon-vote.svg";

interface IconType {
  className?: string;
  onClick?: Function;
  white?: boolean;
}
export const VoteIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconVote} className={className} alt="" />
);
export const PeoplesIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconPeoples} className={className} alt="" />
);
export const GridIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconGrid} className={className} alt="" />
);
export const PopularityIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconPopularity} className={className} alt="" />
);
export const CalendarIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconCalendar} className={className} alt="" />
);
export const ClockIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconClock} className={className} alt="" />
);
export const CountryIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconCountry} className={className} alt="" />
);
export const PriceIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconPrice} className={className} alt="" />
);
export const WebIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconWeb} className={className} alt="" />
);

export const SearchIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconSearch} className={className} alt="" />
);

export const StarIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconStar} className={className} alt="" />
);
export const StarHalfIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconStarHalf} className={className} alt="" />
);
export const StarFillIcon = ({ className }: IconType): React.ReactElement => (
  <img src={iconStarFill} className={className} alt="" />
);

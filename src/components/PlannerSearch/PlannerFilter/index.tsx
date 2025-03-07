import React, { useState } from "react";
import { Grid2 as Grid, Container } from "@mui/material";
import FilterButton from "../../FilterButton/index.tsx";
import {
    amber,
    blue,
    blueGrey,
    brown,
    green,
    grey,
    indigo,
    orange,
    red,
    teal,
} from "@mui/material/colors";
import FilterPanel from "../../FilterPanel/index.tsx";
import FilterDivider from "../../FilterDivider/index.tsx";
import PaymentIcon from "@mui/icons-material/Payment";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import LockIcon from "@mui/icons-material/Lock";
import LocalAirportOutlinedIcon from '@mui/icons-material/LocalAirportOutlined';
import {
    FaHotel,
    FaHiking,
    FaHeart,
    FaThermometerFull,
    FaThermometerHalf,
    FaThermometerQuarter,
    FaSpa,
    FaWheelchair,
    FaChild,
    FaWalking,
    FaSubway,
    FaCar,
} from "react-icons/fa";
import {
    FaHotel as Fa6Hotel,
    FaHouseChimneyUser as Fa6HouseChimneyUser,
    FaPeopleGroup as Fa6PeopleGroup,
    FaUmbrellaBeach as Fa6UmbrellaBeach,
} from "react-icons/fa6";
import { GiCampingTent, GiDeer, GiHeatHaze, GiWaterDrop } from "react-icons/gi";
import {
    MdLocalBar,
    MdFreeBreakfast,
    MdBusinessCenter,
    MdFamilyRestroom,
    MdNightlife,
    MdOutdoorGrill,
    MdMuseum,
    MdCelebration,
    MdLocalDining,
    MdHealthAndSafety,
    MdFitnessCenter,
    MdElderly,
    MdLocalPolice,
} from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { BsEmojiSunglassesFill, BsFillStarFill } from "react-icons/bs";
import { IoSchool as Io5School } from "react-icons/io5";
import { HiMiniShoppingBag as Hi2ShoppingBag } from "react-icons/hi2";
import { GrBike, GrYoga } from "react-icons/gr";
import { BiTrip } from "react-icons/bi";

const PlannerFilter = () => {
    // budget
    const [isLowCost, setIsLowCost] = useState(false);
    const [isMidCost, setIsMidCost] = useState(false);
    const [isHighCost, setIsHighCost] = useState(false);
    const budgetBackground = grey[600];
    const budgetColor = grey[100];
    // accommodation
    const [isHotel, setIsHotel] = useState(false);
    const [isHostel, setIsHostel] = useState(false);
    const [isRental, setIsRental] = useState(false);
    const [isCamping, setIsCamping] = useState(false);
    const [isResort, setIsResort] = useState(false);
    const [isBedBreakfast, setIsBedBreakfast] = useState(false);
    const accommodationBackground = blue[600];
    const accommodationColor = blue[100];
    // duration
    const [isShortTerm, setIsShortTerm] = useState(false);
    const [isMediumTerm, setIsMediumTerm] = useState(false);
    const [isLongTerm, setIsLongTerm] = useState(false);
    const durationBackground = indigo[600];
    const durationColor = indigo[100];
    // purpose of travel
    const [isAdventure, setIsAdventure] = useState(false);
    const [isRelxation, setIsRelaxation] = useState(false);
    const [isCultExplore, setIsCultExplore] = useState(false);
    const [isBusiness, setIsBusiness] = useState(false);
    const [isFamilyTrip, setIsFamilyTrip] = useState(false);
    const [isEducation, setIsEducation] = useState(false);
    const [isRomantic, setIsRomantic] = useState(false);
    const purposeBackground = red[600];
    const purposeColor = red[100];
    // weather preference
    const [isHot, setIsHot] = useState(false);
    const [isMild, setIsMild] = useState(false);
    const [isCold, setIsCold] = useState(false);
    const [isRainy, setIsRainy] = useState(false);
    const [isDry, setIsDry] = useState(false);
    const weatherBackground = teal[600];
    const weatherColor = teal[100];
    // Activity
    const [isSightSeeing, setIsSightSeeing] = useState(false);
    const [isShopping, setIsShopping] = useState(false);
    const [isNightLife, setIsNightLife] = useState(false);
    const [isOutdoor, setIsOutdoor] = useState(false);
    const [isMuseum, setIsMuseum] = useState(false);
    const [isBeach, setIsBeach] = useState(false);
    const [isWildlifeWatching, setIsWildlifeWatching] = useState(false);
    const [isFestival, setIsFestival] = useState(false);
    const [isDining, setIsDining] = useState(false);
    const activityBackground = amber[700];
    const activityColor = amber[100];
    // health and wellness
    const [isSpa, setIsSpa] = useState(false);
    const [isYoga, setIsYoga] = useState(false);
    const [isWellnessResort, setIsWellnessResort] = useState(false);
    const [isFitnessFocused, setIsFitnessFocused] = useState(false);
    const healthBackground = orange[800];
    const healthColor = orange[100];
    // accessibility
    const [isWheelchair, setIsWheelchair] = useState(false);
    const [isSenior, setIsSenior] = useState(false);
    const [isChild, setIsChild] = useState(false);
    const accessBackground = brown[600];
    const accessColor = brown[100];
    // safety
    const [isLowCrime, setIsLowCrime] = useState(false);
    const [isTourist, setIsTourist] = useState(false);
    const safetyBackground = green[600];
    const safetyColor = green[100];
    // Reachable
    const [isWalk, setIsWalk] = useState(false);
    const [isBike, setIsBike] = useState(false);
    const [isCommute, setIsCommute] = useState(false);
    const [isDrive, setIsDrive] = useState(false);
    const reachableBackground = blueGrey[600];
    const reachableColor = blueGrey[100];

    return (
        <Container maxWidth="xl" sx={{ my: 2 }}>
            <Grid container spacing={1} m={1}>
                <FilterPanel
                    title="Budget"
                    icon={<PaymentIcon />}
                    color={budgetBackground}
                >
                    <FilterButton
                        icon="$"
                        label="low cost"
                        isSelected={isLowCost}
                        setIsSelected={setIsLowCost}
                        background={budgetBackground}
                        color={budgetColor}
                    />
                    <FilterButton
                        icon="$$"
                        label="mid-range cost"
                        isSelected={isMidCost}
                        setIsSelected={setIsMidCost}
                        background={budgetBackground}
                        color={budgetColor}
                    />
                    <FilterButton
                        icon="$$$"
                        label="high cost"
                        isSelected={isHighCost}
                        setIsSelected={setIsHighCost}
                        background={budgetBackground}
                        color={budgetColor}
                    />
                </FilterPanel>
                <FilterDivider />
                <FilterPanel
                    title="Housing"
                    icon={<MapsHomeWorkRoundedIcon />}
                    color={accommodationBackground}
                >
                    <FilterButton
                        icon={<Fa6Hotel />}
                        label="hotel"
                        isSelected={isHotel}
                        setIsSelected={setIsHotel}
                        background={accommodationBackground}
                        color={accommodationColor}
                    />
                    <FilterButton
                        icon={<FaHotel />}
                        label="hostel"
                        isSelected={isHostel}
                        setIsSelected={setIsHostel}
                        background={accommodationBackground}
                        color={accommodationColor}
                    />
                    <FilterButton
                        icon={<Fa6HouseChimneyUser />}
                        label="vocation rental"
                        isSelected={isRental}
                        setIsSelected={setIsRental}
                        background={accommodationBackground}
                        color={accommodationColor}
                    />
                    <FilterButton
                        icon={<GiCampingTent />}
                        label="camping"
                        isSelected={isCamping}
                        setIsSelected={setIsCamping}
                        background={accommodationBackground}
                        color={accommodationColor}
                    />
                    <FilterButton
                        icon={<MdLocalBar />}
                        label="resort"
                        isSelected={isResort}
                        setIsSelected={setIsResort}
                        background={accommodationBackground}
                        color={accommodationColor}
                    />
                    <FilterButton
                        icon={<MdFreeBreakfast />}
                        label="bed & breakfast"
                        isSelected={isBedBreakfast}
                        setIsSelected={setIsBedBreakfast}
                        background={accommodationBackground}
                        color={accommodationColor}
                    />
                </FilterPanel>
                <FilterDivider />
                <FilterPanel
                    title="Duration"
                    icon={<TimelapseRoundedIcon />}
                    color={durationBackground}
                >
                    <FilterButton
                        icon="1-3 day"
                        label="short-term"
                        isSelected={isShortTerm}
                        setIsSelected={setIsShortTerm}
                        background={durationBackground}
                        color={durationColor}
                    />
                    <FilterButton
                        icon="4-7 day"
                        label="medium-term"
                        isSelected={isMediumTerm}
                        setIsSelected={setIsMediumTerm}
                        background={durationBackground}
                        color={durationColor}
                    />
                    <FilterButton
                        icon="1+ week"
                        label="long-term"
                        isSelected={isLongTerm}
                        setIsSelected={setIsLongTerm}
                        background={durationBackground}
                        color={durationColor}
                    />
                </FilterPanel>
                <FilterDivider />
                <FilterPanel
                    title="Purpose"
                    icon={<GoGoal />}
                    color={purposeBackground}
                >
                    <FilterButton
                        icon={<FaHiking />}
                        label="advanture"
                        isSelected={isAdventure}
                        setIsSelected={setIsAdventure}
                        background={purposeBackground}
                        color={purposeColor}
                    />
                    <FilterButton
                        icon={<BsEmojiSunglassesFill />}
                        label="relaxation"
                        isSelected={isRelxation}
                        setIsSelected={setIsRelaxation}
                        background={purposeBackground}
                        color={purposeColor}
                    />
                    <FilterButton
                        icon={<Fa6PeopleGroup />}
                        label="culture"
                        isSelected={isCultExplore}
                        setIsSelected={setIsCultExplore}
                        background={purposeBackground}
                        color={purposeColor}
                    />
                    <FilterButton
                        icon={<MdBusinessCenter />}
                        label="business"
                        isSelected={isBusiness}
                        setIsSelected={setIsBusiness}
                        background={purposeBackground}
                        color={purposeColor}
                    />
                    <FilterButton
                        icon={<MdFamilyRestroom />}
                        label="family trip"
                        isSelected={isFamilyTrip}
                        setIsSelected={setIsFamilyTrip}
                        background={purposeBackground}
                        color={purposeColor}
                    />
                    <FilterButton
                        icon={<Io5School />}
                        label="education"
                        isSelected={isEducation}
                        setIsSelected={setIsEducation}
                        background={purposeBackground}
                        color={purposeColor}
                    />
                    <FilterButton
                        icon={<FaHeart />}
                        label="romantic"
                        isSelected={isRomantic}
                        setIsSelected={setIsRomantic}
                        background={purposeBackground}
                        color={purposeColor}
                    />
                </FilterPanel>
                <FilterDivider />
                <FilterPanel
                    title="Weather"
                    icon={<WbCloudyIcon />}
                    color={weatherBackground}
                >
                    <FilterButton
                        icon={<FaThermometerFull />}
                        label="hot"
                        isSelected={isHot}
                        setIsSelected={setIsHot}
                        background={weatherBackground}
                        color={weatherColor}
                    />
                    <FilterButton
                        icon={<FaThermometerHalf />}
                        label="mild"
                        isSelected={isMild}
                        setIsSelected={setIsMild}
                        background={weatherBackground}
                        color={weatherColor}
                    />
                    <FilterButton
                        icon={<FaThermometerQuarter />}
                        label="cold"
                        isSelected={isCold}
                        setIsSelected={setIsCold}
                        background={weatherBackground}
                        color={weatherColor}
                    />
                    <FilterButton
                        icon={<GiWaterDrop />}
                        label="rainy"
                        isSelected={isRainy}
                        setIsSelected={setIsRainy}
                        background={weatherBackground}
                        color={weatherColor}
                    />
                    <FilterButton
                        icon={<GiHeatHaze />}
                        label="dry"
                        isSelected={isDry}
                        setIsSelected={setIsDry}
                        background={weatherBackground}
                        color={weatherColor}
                    />
                </FilterPanel>
                <FilterDivider />
                <FilterPanel
                    title="Activity"
                    icon={<LocalActivityIcon />}
                    color={activityBackground}
                >
                    <FilterButton
                        icon={<BsFillStarFill />}
                        label="sightseeing"
                        isSelected={isSightSeeing}
                        setIsSelected={setIsSightSeeing}
                        background={activityBackground}
                        color={activityColor}
                    />
                    <FilterButton
                        icon={<Hi2ShoppingBag />}
                        label="shopping"
                        isSelected={isShopping}
                        setIsSelected={setIsShopping}
                        background={activityBackground}
                        color={activityColor}
                    />
                    <FilterButton
                        icon={<MdNightlife />}
                        label="night life"
                        isSelected={isNightLife}
                        setIsSelected={setIsNightLife}
                        background={activityBackground}
                        color={activityColor}
                    />
                    <FilterButton
                        icon={<MdOutdoorGrill />}
                        label="outdoor"
                        isSelected={isOutdoor}
                        setIsSelected={setIsOutdoor}
                        background={activityBackground}
                        color={activityColor}
                    />
                    <FilterButton
                        icon={<MdMuseum />}
                        label="museum"
                        isSelected={isMuseum}
                        setIsSelected={setIsMuseum}
                        background={activityBackground}
                        color={activityColor}
                    />
                    <FilterButton
                        icon={<Fa6UmbrellaBeach />}
                        label="beach"
                        isSelected={isBeach}
                        setIsSelected={setIsBeach}
                        background={activityBackground}
                        color={activityColor}
                    />
                    <FilterButton
                        icon={<GiDeer />}
                        label="wildlife watching"
                        isSelected={isWildlifeWatching}
                        setIsSelected={setIsWildlifeWatching}
                        background={activityBackground}
                        color={activityColor}
                    />
                    <FilterButton
                        icon={<MdCelebration />}
                        label="festival"
                        isSelected={isFestival}
                        setIsSelected={setIsFestival}
                        background={activityBackground}
                        color={activityColor}
                    />
                    <FilterButton
                        icon={<MdLocalDining />}
                        label="dining"
                        isSelected={isDining}
                        setIsSelected={setIsDining}
                        background={activityBackground}
                        color={activityColor}
                    />
                </FilterPanel>
                <FilterDivider />
                <FilterPanel
                    title="Health"
                    icon={<HealthAndSafetyIcon />}
                    color={healthBackground}
                >
                    <FilterButton
                        icon={<FaSpa />}
                        label="spa"
                        isSelected={isSpa}
                        setIsSelected={setIsSpa}
                        background={healthBackground}
                        color={healthColor}
                    />
                    <FilterButton
                        icon={<GrYoga />}
                        label="yoga"
                        isSelected={isYoga}
                        setIsSelected={setIsYoga}
                        background={healthBackground}
                        color={healthColor}
                    />
                    <FilterButton
                        icon={<MdHealthAndSafety />}
                        label="wellness resort"
                        isSelected={isWellnessResort}
                        setIsSelected={setIsWellnessResort}
                        background={healthBackground}
                        color={healthColor}
                    />
                    <FilterButton
                        icon={<MdFitnessCenter />}
                        label="fitness"
                        isSelected={isFitnessFocused}
                        setIsSelected={setIsFitnessFocused}
                        background={healthBackground}
                        color={healthColor}
                    />
                </FilterPanel>
                <FilterDivider />
                <FilterPanel
                    title="Access"
                    icon={<AccessibilityIcon />}
                    color={accessBackground}
                >
                    <FilterButton
                        icon={<FaWheelchair />}
                        label="wheelchair"
                        isSelected={isWheelchair}
                        setIsSelected={setIsWheelchair}
                        background={accessBackground}
                        color={accessColor}
                    />
                    <FilterButton
                        icon={<MdElderly />}
                        label="senior"
                        isSelected={isSenior}
                        setIsSelected={setIsSenior}
                        background={accessBackground}
                        color={accessColor}
                    />
                    <FilterButton
                        icon={<FaChild />}
                        label="child"
                        isSelected={isChild}
                        setIsSelected={setIsChild}
                        background={accessBackground}
                        color={accessColor}
                    />
                </FilterPanel>
                <FilterDivider />
                <FilterPanel
                    title="Safety"
                    icon={<LockIcon />}
                    color={safetyBackground}
                >
                    <FilterButton
                        icon={<MdLocalPolice />}
                        label="low crime rate"
                        isSelected={isLowCrime}
                        setIsSelected={setIsLowCrime}
                        background={safetyBackground}
                        color={safetyColor}
                    />
                    <FilterButton
                        icon={<BiTrip />}
                        label="tourist"
                        isSelected={isTourist}
                        setIsSelected={setIsTourist}
                        background={safetyBackground}
                        color={safetyColor}
                    />
                </FilterPanel>
                <FilterDivider />
                <FilterPanel
                    title="Reachable"
                    icon={<LocalAirportOutlinedIcon />}
                    color={reachableBackground}
                >
                    <FilterButton
                        icon={<FaWalking/>}
                        label="pedestrian"
                        isSelected={isWalk}
                        setIsSelected={setIsWalk}
                        background={reachableBackground}
                        color={reachableColor}
                    />
                    <FilterButton
                        icon={<GrBike/>}
                        label="cyclist"
                        isSelected={isBike}
                        setIsSelected={setIsBike}
                        background={reachableBackground}
                        color={reachableColor}
                    />
                    <FilterButton
                        icon={<FaSubway/>}
                        label="commuter"
                        isSelected={isCommute}
                        setIsSelected={setIsCommute}
                        background={reachableBackground}
                        color={reachableColor}
                    />
                    <FilterButton
                        icon={<FaCar/>}
                        label="driver"
                        isSelected={isDrive}
                        setIsSelected={setIsDrive}
                        background={reachableBackground}
                        color={reachableColor}
                    />
                </FilterPanel>
            </Grid>

            {/* <Typography className="ref" sx={{ mx: "auto" }}>
                close
            </Typography> */}
        </Container>
    );
};

export default PlannerFilter;

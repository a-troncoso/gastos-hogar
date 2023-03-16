const blue = {
  0: "#0084FF",
  10: "#2A98FF",
  20: "#5DB1FF",
  30: "#89C6FF",
  40: "#ABD7FF",
  50: "#C6E4FF",
  60: "#D9EDFF",
  70: "#E7F3FF",
  80: "#EFF8FF",
  90: "#F4FAFF",
};

const red = {
  0: "#FF2200",
  10: "#FF462A",
  20: "#FF725D",
  30: "#FF9889",
  40: "#FFB7AB",
  50: "#FFCEC6",
  60: "#FFDED9",
  70: "#FFEAE7",
  80: "#FFF1EF",
  90: "#FFF6F4",
};

const yellow = {
  0: "#FFAE00",
  10: "#FFBC2A",
  20: "#FFCC5D",
  30: "#FFDA89",
  40: "#FFE5AB",
  50: "#FFEDC6",
  60: "#FFF3D9",
  70: "#FFF7E7",
  80: "#FFFAEF",
  90: "#FFFCF4",
};

const green = {
  0: "#88FF00",
  10: "#9EFF2E",
  20: "#B5FF60",
  30: "#C9FF8B",
  40: "#D9FFAD",
  50: "#E5FFC7",
  60: "#EEFFDA",
  70: "",
  80: "",
  90: "",
};

const gray = {
  0: "#ffffff",
  10: "#",
  20: "#",
  30: "#",
  40: "#",
  50: "#D6D8E1",
  60: "#C8CBD4",
  70: "#B9BAC5",
  80: "#A6A8B2",
  90: "#91919C",
  100: "#797882",
  110: "#5D5D64",
  120: "#403F44",
  130: "#201F22",
  140: "#000000",
};

const blueTransparent = {
  90: {
    90: `${blue["90"]}E6`,
    30: `${blue["90"]}4D`,
  },
};

const grayTransparent = {
  130: {
    90: `${gray["130"]}E6`,
    30: `${gray["90"]}4D`,
  },
};

const transparent = {
  blue: blueTransparent,
  gray: grayTransparent,
};

export default {
  blue,
  red,
  yellow,
  green,
  gray,
  transparent,
};

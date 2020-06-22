import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { monthName } from "../../utils/date";
import { AntDesign } from "@expo/vector-icons";

const DateLabel = props => {
  const { date, filter } = props;

  const [_monthName, setMonthName] = useState("");

  useEffect(() => {
    const month = date.getMonth();
    setMonthName(monthName(month).toUpperCase());
  }, [date]);

  const DayTemplate = () => {
    return (
      <>
        <View style={dateLabelStyles.dayTemplateDayView}>
          <Text style={dateLabelStyles.dayTemplateDay}>{date.getDate()}</Text>
        </View>
        <View style={dateLabelStyles.dayTemplateMonthYearView}>
          <Text style={dateLabelStyles.dayTemplateMonth}>{_monthName}</Text>
          <Text style={dateLabelStyles.dayTemplateYear}>
            {date.getFullYear()}
          </Text>
        </View>
      </>
    );
  };

  const MonthTemplate = () => {
    return (
      <View style={dateLabelStyles.monthTemplateView}>
        <Text style={dateLabelStyles.monthTemplateMonth}>{_monthName}</Text>
        <Text style={dateLabelStyles.monthTemplateYear}>
          {date.getFullYear()}
        </Text>
      </View>
    );
  };

  const YearTemplate = () => {
    return (
      <View style={dateLabelStyles.yearTemplateView}>
        <Text style={dateLabelStyles.yearTemplateYear}>
          {date.getFullYear()}
        </Text>
      </View>
    );
  };

  const getDateTemplate = filter => {
    switch (filter) {
      case "day":
        return <DayTemplate />;
      case "month":
        return <MonthTemplate />;
      case "year":
        return <YearTemplate />;
      default:
        return <></>;
    }
  };

  return (
    <View style={dateLabelStyles.dateLabel}>{getDateTemplate(filter)}</View>
  );
};

const dateLabelStyles = StyleSheet.create({
  dayTemplateDayView: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1,
    alignItems: "center"
  },
  dayTemplateDay: {
    fontSize: 18,
    lineHeight: 18
  },
  dayTemplateMonthYearView: {
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  dayTemplateMonth: {
    // borderColor: "green",
    // borderStyle: "solid",
    // borderWidth: 1,
    marginRight: 8,
    fontSize: 12,
    lineHeight: 12
  },
  dayTemplateYear: {
    // borderColor: "brown",
    // borderStyle: "solid",
    // borderWidth: 1,
    fontSize: 12,
    lineHeight: 12
  },
  monthTemplateView: {
    alignItems: "center"
  },
  monthTemplateMonth: {
    fontSize: 16
  },
  monthTemplateYear: {
    fontSize: 12
  },
  yearTemplateYear: {
    fontSize: 18
  }
});

const DateNavigator = props => {
  const { date, filter, onChangeDate } = props;

  const [filterBy, setFilterBy] = useState("month");

  useEffect(() => {
    if (filter) setFilterBy(filter);
  }, [filter]);

  const handlePressMonthNavigator = direction => {
    const newDate = new Date(date);

    switch (filterBy) {
      case "day":
        newDate.setDate(newDate.getDate() + direction);
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + direction);
        break;
      case "year":
        newDate.setFullYear(newDate.getFullYear() + direction);
        break;
      default:
        break;
    }
    onChangeDate(newDate);
  };

  return (
    <View style={dateNavigatorStyles.categoriesMonthlyNavigator}>
      <View style={dateNavigatorStyles.categoriesMonthlyBtns}>
        <TouchableOpacity
          style={dateNavigatorStyles.categoriesMonthlyBtnNavigator}
          onPress={() => handlePressMonthNavigator(-1)}
        >
          <AntDesign name="left" size={32} color="black" />
        </TouchableOpacity>
        <View>
          <DateLabel date={date} filter={filterBy} />
        </View>
        <TouchableOpacity
          style={dateNavigatorStyles.categoriesMonthlyBtnNavigator}
          onPress={() => handlePressMonthNavigator(1)}
        >
          <AntDesign name="right" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const dateNavigatorStyles = StyleSheet.create({
  categoriesMonthlyNavigator: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1,
    height: "auto",
    flex: 0,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center"
  },
  categoriesMonthlyBtns: {
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1,
    height: "auto",
    flex: 0,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "center"
  },
  categoriesMonthlyBtnNavigator: {
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 1,
    flex: 1,
    alignItems: "center"
  }
});

export default DateNavigator;

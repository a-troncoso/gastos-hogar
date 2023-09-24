export const screenNames = {
  Main: "Main",
  Dashboard: "Dashboard",
  RegistryExpense: "RegistryExpense",
  Summary: "Summary",
  CategoryManagement: "CategoryManagement",
  DashbhoardGate: "DashbhoardGate",
  ExpenseCategoryGate: "ExpenseCategoryGate",
  ExpenseDetail: "ExpenseDetail",
  Scan: "Scan",
  HistoryGate: "HistoryGate",
  Expenses: "Expenses",
  ExpenseDetail: "ExpenseDetail",
  Scan: "Scan",
  CategoriesAdminGate: "CategoriesAdminGate",
  CategoryDetail: "CategoryDetail",
};

const RootStackScreenNavigator = { Main: "Main" };

const MainStackScreenNavigator = {
  Dashboard: "Dashboard",
  Home: "Home",
  RegistryExpense: "RegistryExpense",
  Summary: "Summary",
  CategoryManagement: "CategoryManagement",
  RegistryIncome: "RegistryIncome",
};

const DashboardStackScreenNavigator = { DashbhoardGate: "DashbhoardGate" };

const HomeStackNavigator = {
  HomeGate: "HomeGate",
};

const RegistryExpenseStackNavigator = {
  ExpenseCategoryGate: "ExpenseCategoryGate",
  ExpenseDetail: "ExpenseDetail",
  Scan: "Scan",
};

const SummaryStackScreenNavigator = {
  HistoryGate: "HistoryGate",
  Expenses: "Expenses",
  ExpenseDetail: "ExpenseDetail",
  Scan: "Scan",
};

const CategoryManagementStackScreenNavigator = {
  CategoriesAdminGate: "CategoriesAdminGate",
  CategoryDetail: "CategoryDetail",
};

const RegistryIncomeStackScreenNavigator = {
  IncomeDetail: "IncomeDetail",
};

export default {
  RootStackScreenNavigator,
  MainStackScreenNavigator,
  DashboardStackScreenNavigator,
  HomeStackNavigator,
  RegistryExpenseStackNavigator,
  SummaryStackScreenNavigator,
  CategoryManagementStackScreenNavigator,
  RegistryIncomeStackScreenNavigator,
};

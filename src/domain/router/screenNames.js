const RootStackScreenNavigator = { Main: "Main" }

const MainStackScreenNavigator = {
  Dashboard: "Dashboard",
  RegistryExpense: "RegistryExpense",
  Summary: "Summary",
  CategoryManagement: "CategoryManagement"
}

const DashboardStackScreenNavigator = { DashbhoardGate: "DashbhoardGate" }

const RegistryExpenseStackNavigator = {
  ExpenseCategoryGate: "ExpenseCategoryGate",
  ExpenseDetail: "ExpenseDetail",
  Scan: "Scan"
}

const SummaryStackScreenNavigator = {
  HistoryGate: "HistoryGate",
  Expenses: "Expenses",
  ExpenseDetail: "ExpenseDetail",
  Scan: "Scan"
}

const CategoryManagementStackScreenNavigator = {
  CategoriesAdminGate: "CategoriesAdminGate",
  CategoryDetail: "CategoryDetail"
}

export default {
  RootStackScreenNavigator,
  MainStackScreenNavigator,
  DashboardStackScreenNavigator,
  RegistryExpenseStackNavigator,
  SummaryStackScreenNavigator,
  CategoryManagementStackScreenNavigator
}

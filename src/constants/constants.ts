export const routes = [
  {
     name: "home",
     path: "/home",
     icon: "home",
  },
  {
     name: "analytics",
     path: "/analytics",
     icon: "analytics",
  },
  {
     name: "records",
     path: "/records",
     icon: "library-books",
  },
 ];
 
 export const numbers = [
   '7', '4', '1', '0', '8', '5', '2', '.', '9', '6', '3'
 ]

 export const expenseChoices = [
   'Food', 'Transport', 'Health', 'Leisure', 'Education', 'Others'
 ]

 export const incomeChoices = [
  "Salary", "Allowance", "Others"
 ]

 export const categoryChoices = [
   'Income', 'Expense'
 ]
 export const recordTags = [
    'Expense', 'Income'
 ]
 
 export const expenseIcons = [
   'fast-food', 'car', 'medkit', 'tennisball', 'school', 'add-circle'
 ]

 export const incomeIcons = [
  "card", "cash", "add-circle"
 ]
 export const categoryIcons = [
    'bag-add', 'bag-remove'
 ]

 export const expenseIconPair = expenseChoices.map((category, index) => ({
  category: category,
  icon: expenseIcons[index]
}));

export const incomeIconPair = incomeChoices.map((category, index) => ({
  category: category,
  icon: incomeIcons[index]
}));

export const categoryIconPair = categoryChoices.map((category, index) => ({
  category: category,
  icon: categoryIcons[index]
}));

export const bgColors = [
  "red", "blue", "yellow", "green", "violet", "orange", "#66991A", "#FF99E6", "#CCFF1A", "#FF1A66", "#E6331A", "#33FFCC", "#66994D", "#B366CC", "#4D8000", "#B33300", "#CC80CC", "#66664D", "#991AFF", "#E666FF", "#4DB3FF", "#1AB399", "#E666B3", "#33991A", "#CC9999", "#B3B31A", "#00E680", "#4D8066", "#809980", "#E6FF80", "#1AFF33", "#999933", "#FF3380", "#CCCC00", "#66E64D", "#4D80CC", "#9900B3", "#E64D66", "#4DB380", "#FF4D4D", "#99E6E6", "#6666FF"
];

export const filters = [
  {
    label: "A to Z (Ascending)",
    value: "AlphabeticalAtoZ"
  },
  {
    label: "Z to A (Descending)",
    value: "AlphabeticalZtoA"
  },
  {
    label: "Amount (Ascending)",
    value: "AmountAsc"
  },
  {
    label: "Amount (Descending)",
    value: "AmountDesc"
  },
  {
    label: "Date (Ascending)",
    value: "DateAsc"
  },
  {
    label: "Date (Descending)",
    value: "DateDesc"
  }
]
export const bgColors = {
  primary: "#f3f3f3",
  secondary: "#f5f5f5",
  tertiary: "#f7f7f7",
  white: "#ffffff",
  black: "#000000",
};

export const routes = [
  {
     name: "home",
     path: "/home",
     icon: "home", // Assuming you want to use the "home" icon from FontAwesome
  },
  {
     name: "analytics",
     path: "/analytics",
     icon: "analytics",
  },
  {
     name: "records",
     path: "/records",
     icon: "library-books", // Example icon name for records
  },
 ];
 
 export const numbers = [
   '7', '4', '1', '0', '8', '5', '2', '.', '9', '6', '3'
 ]

 export const expenseChoices = [
   'Food', 'Transport', 'Health', 'Leisure', 'Education', 'Others'
 ]

 export const categoryChoices = [
   'Income', 'Expense'
 ]
 export const recordTags = [
    'Expense', 'Income', 'Transfer'
 ]
 
 export const expenseIcons = [
   'fast-food', 'car', 'medkit', 'tennisball', 'school', 'add-circle'
 ]

 export const choiceIconPair = expenseChoices.map((category, index) => ({
  category: category,
  icon: expenseIcons[index]
}));

export const hexColors = [
  "#FF6633", "#B34D4D", "#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A", "#FF99E6", "#CCFF1A", "#FF1A66", "#E6331A", "#33FFCC", "#66994D", "#B366CC", "#4D8000", "#B33300", "#CC80CC", "#66664D", "#991AFF", "#E666FF", "#4DB3FF", "#1AB399", "#E666B3", "#33991A", "#CC9999", "#B3B31A", "#00E680", "#4D8066", "#809980", "#E6FF80", "#1AFF33", "#999933", "#FF3380", "#CCCC00", "#66E64D", "#4D80CC", "#9900B3", "#E64D66", "#4DB380", "#FF4D4D", "#99E6E6", "#6666FF"
];
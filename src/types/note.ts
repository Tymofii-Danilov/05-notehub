export interface Note {
  id?: number;
  title: string;
  content: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

export interface VisitDataType {
  x: string;
  y: number;
}

export interface SecurityDataType {
  index: number;
  id: string;
  name: string;
  holdingunit: number;
  holdingprice: number;
  currentprice:number;
  revenuepercentage: number;
}

export interface OfflineDataType {
  name: string;
  cvr: number;
}

export interface OfflineChartData {
  x: any;
  y1: number;
  y2: number;
}

export interface RadarData {
  name: string;
  label: string;
  value: number;
}

export interface AnalysisData {
  salesData: VisitDataType[];
  stockA: SecurityDataType[];
  all: VisitDataType[];
  china: VisitDataType[];
  usa: VisitDataType[];
  hongkong: VisitDataType[];
  other: VisitDataType[];
}

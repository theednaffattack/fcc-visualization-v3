import { List } from "immutable";
import { browserUsage } from "@vx/mock-data";
import React from "react";
import {
  Table,
  withDynamicCellHeights,
  withSorting,
  withTableAutoSizer,
  withWindowScroller
} from "@data-ui/data-table";

import FilterableTable from "./FilterableTable";
import { tableStyles, sortableTableStyles } from "./tableStyles";

// this is where we're faking up the data
console.log(browserUsage);
const dataList = List(browserUsage);
const allColumns = Object.keys(browserUsage[0]);
const someColumns = allColumns.slice(0, 4);

const DataTable = () => (
  <SortableFilterableTable
    dataList={dataList}
    orderedColumnKeys={someColumns}
    height={400}
    columnFlexGrow={1}
    styles={null}
  />
);

const SortableFilterableTable = withTableAutoSizer(
  withSorting(FilterableTable)
);

export default DataTable;
